import React, { useEffect, useState } from "react";
import { getData, getDataById, saveData } from "../apiservice";
import { toast } from "react-toastify";

const TransferComp = () => {
  const [asset, setAsset] = useState("USDT");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [available, setAvailable] = useState(0);
  const [history, setHistory] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!from || !asset || balances.length === 0) {
      setAvailable(0);
      return;
    }
    const matchedBalance = balances.find(
      (b) =>
        b.account_id === Number(from) &&
        b.coin === asset &&
        b.user_id === user.id
    );
    console.log(matchedBalance);
    setAvailable(matchedBalance ? Number(matchedBalance.balance) : 0);
  }, [from, asset, balances]);
  useEffect(() => {
    getAccounts();
    getTransferHistory();
    console.log(user);

    return () => {};
  }, []);
  const getTransferHistory = async () => {
    let res = await getDataById("transfer", user.id);
    if (res.success) {
      setHistory(res.history);
    }
  };
  const getAccounts = async () => {
    const res = await getData("accounts");
    const balanceRes = await getData("account_balance");
    const userId = user.id;

    if (res.success && Array.isArray(res.accounts)) {
      setAccounts(res.accounts);
      if (res.accounts.length >= 2) {
        setFrom(res.accounts[0].id);
        setTo(res.accounts[1].id);
      } else if (res.accounts.length === 1) {
        setFrom(res.accounts[0].id);
      }
    }

    // ✅ Filter balances only for logged-in user
    if (balanceRes.success && Array.isArray(balanceRes.account_balance)) {
      const userBalances = balanceRes.account_balance.filter(
        (b) => b.user_id === userId
      );
      setBalances(userBalances);
    }
  };

  // Update available balance whenever "From" or "Asset" changes
  useEffect(() => {
    if (!from || !asset || balances.length === 0) {
      setAvailable(0);
      return;
    }

    const matchedBalance = balances.find(
      (b) => b.account_id === Number(from) && b.coin === asset
    );

    if (matchedBalance) {
      setAvailable(Number(matchedBalance.balance));
    } else {
      setAvailable(0);
    }
  }, [from, asset, balances]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleMax = () => {
    setAmount(available);
  };
  const getAccontById = (id) => {
    const found = accounts.find((item) => item.id === id);
    if (found?.id) {
      return found.account_name;
    }
  };
  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      return toast("Please enter a valid amount");
    }

    if (Number(amount) > Number(available)) {
      return toast("Insufficient balance");
    }
    const data = {
      user_id: user.id,
      fromAccountId: from,
      toAccountId: to,
      coin: asset,
      amount,
    };
    let res = await saveData(data, "transfer");
    if (res.success) {
      getTransferHistory();
      setAvailable((prev) => prev - amount);
      setAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 sm:px-20 py-10">
      <h2 className="text-2xl font-semibold mb-8">Transfer</h2>

      {/* Asset Dropdown */}
      <div className="mb-8 max-w-md">
        <label className="block text-sm text-gray-700 mb-1">Asset</label>
        <select
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          className="w-full border border-[#E5E5E5] bg-[#E5E5E5] rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none"
        >
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      </div>

      {/* From and To Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="flex-1 max-w-xs">
          <label className="block text-sm text-gray-700 mb-1">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border border-[#E5E5E5] bg-[#E5E5E5] rounded-xl px-3 py-2 text-gray-700 text-sm bg-gray-50"
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.account_name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="text-gray-500 text-lg mt-4 sm:mt-7 hover:text-gray-700"
        >
          ⇌
        </button>

        <div className="flex-1 max-w-xs">
          <label className="block text-sm text-gray-700 mb-1">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border border-[#E5E5E5] bg-[#E5E5E5] rounded-xl px-3 py-2 text-gray-700 text-sm bg-gray-50"
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.account_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amount Section */}
      <div className="max-w-md mb-8">
        <label className="block text-sm text-gray-700 mb-1">Amount</label>
        <div className="flex items-center justify-between border border-[#E5E5E5] bg-[#E5E5E5] rounded-xl px-3 py-2 text-sm bg-gray-50">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent outline-none flex-1 text-gray-800"
          />
          <div className="flex items-center gap-3">
            <span className="text-gray-600">{asset}</span>
            <button
              onClick={handleMax}
              className="text-gray-700 text-sm hover:text-black"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Available: {available} {asset}
        </div>
      </div>

      {/* Transfer Button */}
      <div className="mb-10">
        <button
          onClick={handleTransfer}
          className="px-5 py-2 border border-[#E5E5E5] bg-[#E5E5E5] rounded-xl text-gray-700 text-sm hover:bg-gray-50"
        >
          Transfer
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b flex  font-semibold text-3xl mb-8">
        <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300">
          Transfer history
        </button>
      </div>

      {/* Transfer Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700 border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Crypto</th>
              <th className="py-2 px-4 font-medium">Amount</th>
              <th className="py-2 px-4 font-medium">From</th>
              <th className="py-2 px-4 font-medium">To</th>
              <th className="py-2 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 &&
              history.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{item.coin}</td>
                  <td className="py-3 px-4">{item.amount}</td>
                  <td className="py-3 px-4">
                    {getAccontById(item?.from_account)}
                  </td>
                  <td className="py-3 px-4">
                    {getAccontById(item.to_account)}
                  </td>
                  <td className="py-3 px-4">{item.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferComp;
