import React, { useState } from "react";
import QRCode from "react-qr-code";

const walletAddresses = {
  USDT: "TNibKBzQAcwurnCDdv89E2WMo1WdtN8sWF",
  Ethereum: "0x4Df76D9d6A9321aBD9B8fC4F5b36eA6bC4fE29C5",
  Bitcoin: "bc1qv9n0x9skf0a4y9x6z7f9n3q",
};

const DepositPayment = ({ coin, onBack }) => {
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);

  const walletAddress = walletAddresses[coin];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Deposit Proof Submitted!\nCoin: ${coin}\nAmount: ${amount}`);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-[420px] flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Fund ({coin})</h2>

      <QRCode value={walletAddress} size={150} className="mb-4" />

      <div className="w-full">
        <label className="block text-sm font-medium mb-1">Wallet Address</label>
        <div className="flex items-center mb-3">
          <input
            type="text"
            readOnly
            value={walletAddress}
            className="border p-2 rounded-l-lg w-full bg-gray-100 text-gray-700"
          />
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(walletAddress)}
            className="bg-gray-700 text-white px-3 rounded-r-lg hover:bg-gray-800"
          >
            Copy
          </button>
        </div>

        <label className="block text-sm font-medium mb-1">Amount (USD)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4"
        />

        <label className="block text-sm font-medium mb-1">Upload Proof</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-5"
        />

        <button
          onClick={handleSubmit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold w-full py-3 rounded-lg transition"
        >
          Send Proof of Deposit
        </button>

        <button
          onClick={onBack}
          className="text-gray-500 text-sm mt-3 underline hover:text-gray-700"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default DepositPayment;
