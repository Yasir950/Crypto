import React, { useState } from "react";

function ConvertComp() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [rate, setRate] = useState(0.000015); // Example rate: 1 USDT = 0.000015 BTC

  const handleConvert = (value) => {
    setFromAmount(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setToAmount((numericValue * rate).toFixed(8)); // Auto calculate
    } else {
      setToAmount("");
    }
  };

  // FAQs with accordion toggle
  const [openIndex, setOpenIndex] = useState(null);
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

  return (
    <div className="min-h-screen bg-[#f4f4f4] sm:px-20 py-8 md:py-12 flex ">
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
        <section className="p-6 md:p-10 rounded-lg border  max-w-5xl mx-auto shadow-sm">
          <div className="md:flex md:items-start md:justify-between">
            <div className="md:flex-1">
              <h3 className="text-2xl md:text-3xl font-semibold">Convert</h3>
              <h2 className="text-xl md:text-2xl font-semibold mt-1">
                USDT to BTC
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                0 fees | Lower limits | Simple transactions
              </p>
            </div>

            <div className="md:w-96 mt-6 md:mt-0">
              <div className="border p-4 shadow-lg ">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Convert</div>
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    FREE
                  </div>
                </div>

                {/* From Input */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">From</div>
                  <div className="bg-[#EDEDED] rounded-lg p-3 flex justify-between items-center">
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => handleConvert(e.target.value)}
                      placeholder="Enter USDT amount"
                      className="bg-transparent outline-none text-sm w-full"
                    />
                    <span className="font-semibold">USDT</span>
                  </div>
                </div>

                {/* To Result */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">To</div>
                  <div className="bg-[#EDEDED] rounded-lg p-3 flex justify-between items-center">
                    <span className="font-semibold">BTC</span>
                    <span className="text-sm text-gray-600">
                      {toAmount || "0.00000000"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
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

export default ConvertComp;
