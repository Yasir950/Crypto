import React, { useState } from "react";

function WithDrawComp() {
  const [selectedCrypto, setSelectedCrypto] = useState("");

  const transactions = [
    {
      date: "09/26/2025, 11:17:22",
      address: "bc1qg7h7wpxjlfsyxj0r9dxjknldq5mr2x9e6",
      network: "BTC",
      amount: "0.0005107",
      fee: "0.000001",
      status: "Sent",
    },
    {
      date: "07/18/2025, 06:54:47",
      address: "4323431411F...8F6234",
      network: "USDT",
      amount: "3",
      fee: "0",
      status: "Sent",
    },
    {
      date: "07/13/2025, 23:18:34",
      address: "TAkRTqhehL5gkg2xFUhqjkqL",
      network: "USDT",
      amount: "2.7",
      fee: "2.3",
      status: "Sent",
    },
    {
      date: "05/24/2025, 09:47:54",
      address: "TVz1zqEF7z7uZw6yRtymFrom TRC20",
      network: "USDT",
      amount: "48.5",
      fee: "6",
      status: "Sent",
    },
    {
      date: "03/28/2025, 14:22:17",
      address: "TLumen7hPzU6kQGJvMGWTX",
      network: "USDT",
      amount: "800",
      fee: "0",
      status: "Sent",
    },
  ];

  return (
    <div className="bg-white min-h-screen  sm:px-20 py-8 md:py-12 flex ">
      <div className="w-full max-w-4xl space-y-6">
        {/* Top info small card */}
        <div className="p-4 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-gray-500">
            Test User
            <br />
            023416523125
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Email
            <br /> test@gmail.com
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Identity verification {" >"} <br />
            <span className="font-medium text-gray-800">Verified</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Country/Region {" >"} <br />
            <span className="font-medium text-gray-800">Pakistan</span>
          </div>
        </div>

        {/* Convert Section */}
        <div className="min-h-screen bg-white px-4 sm:px-10 py-10">
          <div className="max-w-6xl mx-auto bg-white">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">
              Withdrawal
            </h2>

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10">
              {/* Left side steps */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full border border-black font-semibold text-sm">
                      1
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Select a Crypto
                    </h3>
                  </div>
                  <select
                    className="w-full border border-gray-300 rounded-md py-3 px-3 text-gray-600 text-sm focus:outline-none"
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                  >
                    <option value="">Select Crypto</option>
                    <option value="BTC">BTC</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>

                {/* Step 2 */}
                <div className="opacity-60">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400 font-semibold text-sm">
                      2
                    </div>
                    <h3 className="font-semibold text-gray-500">
                      Set destination
                    </h3>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="opacity-60">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400 font-semibold text-sm">
                      3
                    </div>
                    <h3 className="font-semibold text-gray-500">
                      Set withdrawal amount
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right side FAQs */}
              <div className="border rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">FAQs</h3>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li>How do I convert crypto on OKX?</li>
                  <li>Which crypto can I convert on OKX?</li>
                  <li>How is crypto conversion different from trading?</li>
                  <li>What are the conditions of crypto conversion?</li>
                  <li>Where can I find my converted crypto?</li>
                </ul>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b text-gray-500 font-medium">
                  <tr>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Address</th>
                    <th className="py-3 px-4 text-left">Network</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Fee</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">{t.date}</td>
                      <td className="py-3 px-4 text-gray-600 truncate max-w-[200px]">
                        {t.address}
                      </td>
                      <td className="py-3 px-4">{t.network}</td>
                      <td className="py-3 px-4">{t.amount}</td>
                      <td className="py-3 px-4">{t.fee}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">
                        {t.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithDrawComp;
