import React, { useEffect, useMemo, useState } from "react";
import { getData, getDataById, saveData } from "../apiservice";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";

const COIN_FALLBACK_PAIR = {
  BTC: "BTCUSDT",
  ETH: "ETHUSDT",
  SOL: "SOLUSDT",
  BNB: "BNBUSDT",
  USDT: null,
};

function formatBn(value, decimals = 8) {
  try {
    return new BigNumber(value).toFixed(decimals);
  } catch {
    return value;
  }
}

const faqs = [
  {
    q: "How do I convert crypto on OKX?",
    a: "Go to the Convert section, choose your crypto pair, enter amount, and click Convert.",
  },
  {
    q: "Which crypto can I convert on OKX?",
    a: "You can convert major cryptocurrencies such as BTC, ETH, USDT, SOL, and more.",
  },
  {
    q: "How is crypto conversion different from trading?",
    a: "Conversion happens instantly at a fixed rate, while trading involves placing orders on the market.",
  },
  {
    q: "What are the conditions of crypto conversion?",
    a: "Conversion may depend on liquidity and supported pairs available on the platform.",
  },
  {
    q: "Where can I find my converted crypto?",
    a: "Your converted assets will appear in your wallet instantly after conversion.",
  },
  {
    q: "How do I check my conversion orders?",
    a: "You can check your order history under 'My Orders' in your dashboard.",
  },
  {
    q: "How can I deposit/withdraw the crypto converted?",
    a: "Go to Wallet > Deposit or Withdraw to manage your funds.",
  },
];

export default function ConvertComp() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [openIndex, setOpenIndex] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [fromCoin, setFromCoin] = useState("");
  const [toCoin, setToCoin] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [prices, setPrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [convertHistory, setConvertHistory] = useState([]);

  // Load user data
  useEffect(() => {
    async function load() {
      try {
        if (!user?.id) return;

        const [resBalances, resAccounts, resHistory] = await Promise.all([
          getDataById("account_balance", user.id),
          getData("accounts"),
          getDataById("convert", user.id),
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

  // Filter user coins by selected account type
  const filteredCoins = useMemo(() => {
    if (!accountType) return [];
    return userAccounts.filter(
      (a) => String(a.account_id) === String(accountType)
    );
  }, [accountType, userAccounts]);

  // Selected account details
  const fromAccount = useMemo(
    () => filteredCoins.find((a) => a.coin === fromCoin),
    [filteredCoins, fromCoin]
  );
  const toAccount = useMemo(
    () => filteredCoins.find((a) => a.coin === toCoin),
    [filteredCoins, toCoin]
  );
  const tryPair = async (pair) => {
    const resp = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${pair}`
    );
    if (!resp.ok) return null;
    const json = await resp.json();
    return json.price ? Number(json.price) : null;
  };
  // Fetch live rate from Binance
  async function fetchBinancePairPrice(fromCoin, toCoin) {
    try {
      if (!fromCoin || !toCoin) return null;
      if (fromCoin === toCoin) return 1;

      // 🔍 Try direct and reverse
      const direct = `${fromCoin}${toCoin}`.toUpperCase();
      const reverse = `${toCoin}${fromCoin}`.toUpperCase();
      if (direct === "USDTBTC") {
        let price = await tryPair(reverse);
        if (price) return 1 / price;
      } else {
        let price = await tryPair(direct);
        if (price) return price;
      }
      // 💡 USDT fallback
      const [pFrom, pTo] = await Promise.all([
        tryPair(`${fromCoin}USDT`),
        tryPair(`${toCoin}USDT`),
      ]);

      if (pFrom && pTo) return pFrom / pTo;

      console.warn(`❌ No valid Binance pair found for ${fromCoin}/${toCoin}`);
      return null;
    } catch (err) {
      console.error("fetchBinancePairPrice error:", err);
      return null;
    }
  }

  // Load rates
  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      if (!fromCoin || !toCoin) return;
      setLoadingPrices(true);
      setError(null);

      const rate = await fetchBinancePairPrice(fromCoin, toCoin);
      if (!isCancelled) {
        if (rate !== null) {
          setPrices((prev) => ({ ...prev, [`${fromCoin}_${toCoin}`]: rate }));
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
  }, [fromCoin, toCoin]);

  // Auto calculate
  useEffect(() => {
    if (!fromCoin || !toCoin || !fromAmount) {
      setToAmount("");
      return;
    }
    const key = `${fromCoin}_${toCoin}`;
    const rate = prices[key];
    if (!rate) {
      setToAmount("");
      return;
    }

    const bnFrom = new BigNumber(fromAmount);
    const bnTo = bnFrom.multipliedBy(rate);
    setToAmount(bnTo.toFixed(8));
  }, [fromAmount, fromCoin, toCoin, prices]);

  // Convert
  const handleConvert = async () => {
    setError(null);
    setMessage(null);

    if (!fromCoin || !toCoin) return setError("Select both FROM and TO coins.");
    if (!fromAmount || Number(fromAmount) <= 0)
      return setError("Enter valid amount.");
    if (Number(fromAmount) > Number(fromAccount?.balance || 0))
      return setError("Insufficient balance.");

    setSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        account_type: accountType,
        from_coin: fromCoin,
        to_coin: toCoin,
        amount: formatBn(fromAmount),
        converted_amount: formatBn(toAmount),
      };

      const res = await saveData(payload, "convert");
      if (!res.success) throw new Error(res.message || "Conversion failed.");
      toast.success(
        `${fromAmount} ${fromCoin} successfully converted to ${toCoin}`
      );
      // Update local balances
      setUserAccounts((prev) =>
        prev.map((acc) => {
          if (acc.coin === fromCoin && acc.account_id === accountType) {
            return {
              ...acc,
              balance: new BigNumber(acc.balance).minus(fromAmount).toFixed(8),
            };
          }
          if (acc.coin === toCoin && acc.account_id === accountType) {
            return {
              ...acc,
              balance: new BigNumber(acc.balance).plus(toAmount).toFixed(8),
            };
          }
          return acc;
        })
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
    if (!fromCoin || !toCoin) return "";
    const key = `${fromCoin}_${toCoin}`;
    const r = prices[key];
    if (!r) return "";
    return `1 ${fromCoin} ≈ ${formatBn(r)} ${toCoin}`;
  }, [fromCoin, toCoin, prices]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-12">
      <div className="max-w-4xl mx-auto p-6">
        <section className="p-6 md:p-10 rounded-lg border max-w-5xl mx-auto shadow-sm">
          <div className="md:flex md:items-start md:justify-between">
            <div className="md:flex-1">
              <h3 className="text-2xl md:text-3xl font-semibold">Convert</h3>
              <p className="text-sm text-gray-500 mt-2">
                0 fees | Lower limits | Simple transactions
              </p>
            </div>

            <div className="md:w-96 mt-6 md:mt-0">
              <div className="border p-4 shadow-lg">
                {/* Account Type */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Account Type</div>
                  <select
                    value={accountType}
                    onChange={(e) => {
                      setAccountType(e.target.value);
                      setFromCoin("");
                      setToCoin("");
                    }}
                    className="w-full bg-[#EDEDED] rounded-lg border-none p-2"
                  >
                    <option value="">Select Account Type</option>
                    {totalAccounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.account_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* From */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">From</div>
                  <div className="bg-[#EDEDED] rounded-lg p-3 flex flex-col">
                    <div className="flex justify-between">
                      <select
                        value={fromCoin}
                        onChange={(e) => setFromCoin(e.target.value)}
                        className="w-24 bg-[#EDEDED] mb-5 border-none p-1"
                      >
                        <option value="">Select FROM</option>
                        {filteredCoins.map((a) => (
                          <option key={a.coin} value={a.coin}>
                            {a.coin} (bal: {formatBn(a.balance)})
                          </option>
                        ))}
                      </select>
                      <div>
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
                            : rateString || "Select coins to see rate"}
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="bg-transparent outline-none text-sm w-full"
                    />
                  </div>
                </div>

                {/* To */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">To</div>
                  <div className="bg-[#EDEDED] rounded-lg p-3 flex flex-col justify-between">
                    <select
                      value={toCoin}
                      onChange={(e) => setToCoin(e.target.value)}
                      className="bg-[#EDEDED] border-none w-24 p-1 mb-2"
                    >
                      <option value="">Select TO</option>
                      {filteredCoins
                        .filter((a) => a.coin !== fromCoin)
                        .map((a) => (
                          <option key={a.coin} value={a.coin}>
                            {a.coin}
                          </option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-600">
                      {toAmount || "0.00000000"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleConvert}
                  disabled={submitting}
                  className="w-full mt-4 bg-black text-white py-2 rounded hover:opacity-80 disabled:opacity-50"
                >
                  {submitting ? "Converting..." : "Convert"}
                </button>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {message && (
                  <p className="text-green-600 text-sm mt-2">{message}</p>
                )}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mt-8">
            <h4 className="text-lg font-semibold mb-4">FAQs</h4>
            <div className="divide-y border-t border-b">
              {faqs.map((item, i) => (
                <div key={i} className="py-4">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="text-sm text-gray-800">{item.q}</span>
                    <span className="text-gray-500 text-lg">
                      {openIndex === i ? "▴" : "▾"}
                    </span>
                  </button>
                  {openIndex === i && (
                    <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
