import React, { useState } from "react";

const DepositMethod = ({ onContinue }) => {
  const [selected, setSelected] = useState("USDT");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Select Payment Method
      </h2>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border rounded-lg w-full p-3 mb-4 focus:ring-2 focus:ring-yellow-500 outline-none"
      >
        <option value="USDT">USDT</option>
        <option value="Ethereum">Ethereum</option>
        <option value="Bitcoin">Bitcoin</option>
      </select>

      <button
        onClick={() => onContinue(selected)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold w-full py-3 rounded-lg transition"
      >
        Continue
      </button>
    </div>
  );
};

export default DepositMethod;
