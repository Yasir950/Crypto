import React, { useState } from "react";

const TransferComp = () => {
  const [asset, setAsset] = useState("USDT");
  const [from, setFrom] = useState("Funding");
  const [to, setTo] = useState("Trading");
  const [amount, setAmount] = useState("");
  const [available, setAvailable] = useState(1500.25); // example balance
  const [history, setHistory] = useState([]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleMax = () => {
    setAmount(available);
  };

  const handleTransfer = () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");

    const newTransfer = {
      crypto: asset,
      amount,
      from,
      to,
      date: new Date().toLocaleString(),
      status: "Completed",
    };

    setHistory([newTransfer, ...history]);
    setAvailable((prev) => prev - amount);
    setAmount("");
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
          <div className="border border-[#E5E5E5] bg-[#E5E5E5] rounded-xl px-3 py-2 text-gray-700 text-sm bg-gray-50">
            {from}
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="text-gray-500 text-lg mt-4 sm:mt-7 hover:text-gray-700"
        >
          ⇌
        </button>

        <div className="flex-1 max-w-xs">
          <label className="block text-sm text-gray-700 mb-1">To</label>
          <div className="border border-[#E5E5E5] bg-[#E5E5E5] rounded-xl px-3 py-2 text-gray-700 text-sm bg-gray-50">
            {to}
          </div>
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
      <div className="border-b flex text-sm text-gray-700 mb-4">
        <button className="px-4 py-2 border-b-2 border-gray-800 font-medium">
          {asset} Transfers
        </button>
        <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300">
          Transfer history
        </button>
      </div>

      {/* Transfer Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700 border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-medium">Crypto</th>
              <th className="py-2 px-4 font-medium">Amount</th>
              <th className="py-2 px-4 font-medium">From</th>
              <th className="py-2 px-4 font-medium">To</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0
              ? history.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4">{item.crypto}</td>
                    <td className="py-3 px-4">{item.amount}</td>
                    <td className="py-3 px-4">{item.from}</td>
                    <td className="py-3 px-4">{item.to}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.status}</td>
                  </tr>
                ))
              : Array(6)
                  .fill("-")
                  .map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">-</td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferComp;
