import React, { useEffect, useMemo, useState } from "react";
import { getData, getDataById, saveData } from "../apiservice";
import BigNumber from "bignumber.js";

/*
  - Shows live Binance conversion
  - Updates balances after convert
  - Shows user-specific conversion history
*/

const COIN_FALLBACK_PAIR = {
  BTC: "BTCUSDT",
  ETH: "ETHUSDT",
  SOL: "SOLUSDT",
  BNB: "BNBUSDT",
  USDT: null,
};

// Format helper — always 2 decimals
function formatBn(value, decimals = 2) {
  try {
    return new BigNumber(value).toFixed(decimals);
  } catch {
    return value;
  }
}

export default function ConvertComp() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [userAccounts, setUserAccounts] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState([]);
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [prices, setPrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [convertHistory, setConvertHistory] = useState([]); // ✅ New

  // Load user accounts + conversion history
  useEffect(() => {
    async function load() {
      try {
        if (!user?.id) return;

        const [resBalances, resAccounts, resHistory] = await Promise.all([
          getDataById("account_balance", user.id),
          getData("accounts"),
          getDataById("convert", user.id), // 👈 fetch conversion history
        ]);

        if (resBalances?.success) setUserAccounts(resBalances.accounts || []);
        if (resAccounts?.success) setTotalAccounts(resAccounts.accounts || []);
        if (resHistory?.success) setConvertHistory(resHistory.history || []);
      } catch (err) {
        console.error("Failed loading:", err);
      }
    }
    load();
  }, [user?.id]);

  const getAccountName = (accountId) => {
    const found = totalAccounts.find((a) => String(a.id) === String(accountId));
    return found ? found.account_name : `Account ${accountId}`;
  };

  const fromAccount = useMemo(
    () =>
      userAccounts.find((a) => `${a.account_id}-${a.coin}` === fromAccountId),
    [userAccounts, fromAccountId]
  );

  const toAccount = useMemo(
    () => userAccounts.find((a) => `${a.account_id}-${a.coin}` === toAccountId),
    [userAccounts, toAccountId]
  );

  // Fetch Binance live rate
  async function fetchBinancePairPrice(fromCoin, toCoin) {
    try {
      if (!fromCoin || !toCoin) return null;
      if (fromCoin === toCoin) return 1;

      const tryPair = async (pair) => {
        try {
          const resp = await fetch(
            `https://api.binance.com/api/v3/ticker/price?symbol=${pair}`
          );
          if (!resp.ok) return null;
          const json = await resp.json();
          if (json && json.price) return Number(json.price);
          return null;
        } catch {
          return null;
        }
      };

      const direct = `${fromCoin}${toCoin}`.toUpperCase();
      let price = await tryPair(direct);
      if (price) return price;

      const reverse = `${toCoin}${fromCoin}`.toUpperCase();
      price = await tryPair(reverse);
      if (price) return 1 / price;

      const fromUsdtPair = COIN_FALLBACK_PAIR[fromCoin] || `${fromCoin}USDT`;
      const toUsdtPair = COIN_FALLBACK_PAIR[toCoin] || `${toCoin}USDT`;

      if (fromUsdtPair && toUsdtPair) {
        const [pFromResp, pToResp] = await Promise.all([
          tryPair(fromUsdtPair),
          tryPair(toUsdtPair),
        ]);
        if (pFromResp && pToResp) return pFromResp / pToResp;
      }

      return null;
    } catch (err) {
      console.error("fetchBinancePairPrice error:", err);
      return null;
    }
  }

  // Load rate
  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      if (!fromAccount?.coin || !toAccount?.coin) return;
      setLoadingPrices(true);
      setError(null);

      const fromCoin = fromAccount.coin.toUpperCase();
      const toCoin = toAccount.coin.toUpperCase();
      const rate = await fetchBinancePairPrice(fromCoin, toCoin);

      if (!isCancelled) {
        if (rate !== null) {
          setPrices((prev) => ({
            ...prev,
            [`${fromCoin}_${toCoin}`]: rate,
          }));
        } else setError("Live pair not found.");
        setLoadingPrices(false);
      }
    };

    load();
    const interval = setInterval(load, 60000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [fromAccount?.coin, toAccount?.coin]);

  // Auto calculate
  useEffect(() => {
    if (!fromAccount || !toAccount) {
      setToAmount("");
      return;
    }
    if (!fromAmount || isNaN(Number(fromAmount))) {
      setToAmount("");
      return;
    }
    const key = `${fromAccount.coin}_${toAccount.coin}`;
    const rate = prices[key];
    if (!rate) {
      setToAmount("");
      return;
    }
    const bnFrom = new BigNumber(fromAmount);
    const bnTo = bnFrom.multipliedBy(new BigNumber(rate));
    setToAmount(bnTo.toFixed(2));
  }, [fromAmount, fromAccount, toAccount, prices]);

  // Convert
  const handleConvert = async () => {
    setError(null);
    setMessage(null);

    if (!fromAccount || !toAccount)
      return setError("Select both FROM and TO accounts.");

    if (!fromAmount || Number(fromAmount) <= 0)
      return setError("Enter valid amount.");

    if (Number(fromAmount) > Number(fromAccount.balance))
      return setError("Insufficient balance.");

    setSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        from_account_id: fromAccount.account_id,
        to_account_id: toAccount.account_id,
        from_coin: fromAccount.coin,
        to_coin: toAccount.coin,
        amount: formatBn(fromAmount),
        converted_amount: formatBn(toAmount),
      };

      const res = await saveData(payload, "convert");
      if (!res.success) throw new Error(res.message || "Conversion failed.");

      // Update balances
      setUserAccounts((prev) =>
        prev.map((acc) => {
          if (
            acc.account_id === fromAccount.account_id &&
            acc.coin === fromAccount.coin
          ) {
            return {
              ...acc,
              balance: new BigNumber(acc.balance)
                .minus(new BigNumber(fromAmount))
                .toFixed(2),
            };
          }
          if (
            acc.account_id === toAccount.account_id &&
            acc.coin === toAccount.coin
          ) {
            return {
              ...acc,
              balance: new BigNumber(acc.balance)
                .plus(new BigNumber(toAmount))
                .toFixed(2),
            };
          }
          return acc;
        })
      );

      // ✅ Update history list instantly
      setConvertHistory((prev) => [
        {
          id: Date.now(),
          from_coin: fromAccount.coin,
          to_coin: toAccount.coin,
          amount: formatBn(fromAmount),
          converted_amount: formatBn(toAmount),
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);

      setMessage(
        `✅ Converted ${formatBn(fromAmount)} ${fromAccount.coin} → ${formatBn(
          toAmount
        )} ${toAccount.coin}`
      );

      setFromAmount("");
      setToAmount("");
    } catch (err) {
      console.error("Convert error:", err);
      setError(err.message || "Conversion failed");
    } finally {
      setSubmitting(false);
    }
  };

  const rateString = useMemo(() => {
    if (!fromAccount || !toAccount) return "";
    const key = `${fromAccount.coin}_${toAccount.coin}`;
    const r = prices[key];
    if (!r) return "";
    return `1 ${fromAccount.coin} ≈ ${formatBn(r)} ${toAccount.coin}`;
  }, [fromAccount, toAccount, prices]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-12">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Convert</h2>

        {/* ---- Convert Form ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              From account
            </label>
            <select
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
              className="w-full border rounded-md p-3"
            >
              <option value="">Select FROM</option>
              {userAccounts.map((a) => (
                <option
                  key={`${a.account_id}-${a.coin}`}
                  value={`${a.account_id}-${a.coin}`}
                >
                  {getAccountName(a.account_id)} — {a.coin} (bal:{" "}
                  {formatBn(a.balance)})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Available:{" "}
              <span className="font-medium">
                {fromAccount ? formatBn(fromAccount.balance) : "--"}{" "}
                {fromAccount?.coin}
              </span>
            </p>
            <div className="text-xs text-gray-500 mt-1">
              {loadingPrices
                ? "Fetching live rates..."
                : rateString || "Select accounts to see rate"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To account</label>
            <select
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              className="w-full border rounded-md p-3"
            >
              <option value="">Select TO</option>
              {userAccounts.map((a) => (
                <option
                  key={`${a.account_id}-${a.coin}`}
                  value={`${a.account_id}-${a.coin}`}
                >
                  {getAccountName(a.account_id)} — {a.coin} (bal:{" "}
                  {formatBn(a.balance)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mt-10">
          <div>
            <label className="block text-sm font-medium mb-2">
              Amount (FROM)
            </label>
            <input
              inputMode="decimal"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="w-full border rounded-md p-3"
              placeholder="e.g. 0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Estimated receive (TO)
            </label>
            <div className="w-full border rounded-md p-3 bg-gray-50">
              <div className="text-lg font-medium">{toAmount || "0.00"}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleConvert}
            disabled={submitting}
            className="bg-black text-white px-5 py-2 rounded-md disabled:opacity-60"
          >
            {submitting ? "Converting..." : "Convert"}
          </button>
          <button
            onClick={() => {
              setFromAmount("");
              setToAmount("");
              setMessage(null);
              setError(null);
            }}
            className="border px-5 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="mt-4">
          {message && <div className="text-green-700">{message}</div>}
          {error && <div className="text-red-600">{error}</div>}
        </div>

        {/* ✅ Conversion History Table */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Conversion History</h3>
          {convertHistory.length === 0 ? (
            <p className="text-sm text-gray-500">No conversions yet.</p>
          ) : (
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">From</th>
                    <th className="px-4 py-2 text-left">To</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Converted</th>
                  </tr>
                </thead>
                <tbody>
                  {convertHistory.map((h) => (
                    <tr key={h.id} className="border-t">
                      <td className="px-4 py-2">
                        {new Date(h.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">{h.from_coin}</td>
                      <td className="px-4 py-2">{h.to_coin}</td>
                      <td className="px-4 py-2">
                        {formatBn(h.from_amount)} {h.from_coin}
                      </td>
                      <td className="px-4 py-2">
                        {formatBn(h.to_amount)} {h.to_coin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
