import React, { useState } from "react";
import Chart from "react-apexcharts";

const TradeDashboard = () => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  // Exact line chart configuration (blue gradient like Binance)
  const chartOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    grid: {
      borderColor: "#1F1F1F",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#008FFB"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#1E67AA",
            opacity: 0.4,
          },
          {
            offset: 100,
            color: "#0B0B0B",
            opacity: 0,
          },
        ],
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "#888", fontSize: "11px" },
      },
      axisTicks: { show: false },
      axisBorder: { color: "#1F1F1F" },
    },
    yaxis: {
      labels: {
        style: { colors: "#888", fontSize: "11px" },
      },
    },
    tooltip: {
      theme: "dark",
      x: { format: "dd MMM HH:mm" },
    },
  };

  const chartSeries = [
    {
      name: "BTC/USDT",
      data: [
        [1737000000000, 33500],
        [1737003600000, 33850],
        [1737007200000, 33700],
        [1737010800000, 34000],
        [1737014400000, 33920],
        [1737018000000, 34250],
        [1737021600000, 34100],
        [1737025200000, 34500],
        [1737028800000, 34300],
        [1737032400000, 34750],
        [1737036000000, 34600],
      ],
    },
  ];

  return (
    <div className="bg-[#0B0B0B] text-gray-200 h-screen flex flex-col">
      {/* Top Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-[#111111] border-b border-gray-800">
        <h1 className="text-lg font-semibold text-white">BTC / USDT</h1>
        <nav className="space-x-4 text-sm text-gray-400 hidden md:flex">
          <button>Trade</button>
          <button>Market</button>
          <button>Orders</button>
          <button>Wallet</button>
        </nav>
      </header>

      {/* Main Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Markets) */}
        {showLeft && (
          <aside className="w-60 bg-[#141414] border-r border-gray-800 overflow-y-auto hidden md:block">
            <div className="p-3 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-sm font-semibold">Markets</h2>
              <button onClick={() => setShowLeft(false)}>×</button>
            </div>
            <ul className="text-xs p-3 space-y-2">
              {["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT"].map((pair) => (
                <li
                  key={pair}
                  className="flex justify-between py-1 hover:bg-[#1E1E1E] px-2 rounded"
                >
                  <span>{pair}</span>
                  <span className="text-green-500">
                    {(Math.random() * 5 + 95).toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Chart + Buy/Sell Section */}
        <main className="flex-1 flex flex-col bg-[#0E0E0E]">
          <div className="flex-1">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="area"
              height="100%"
              width="100%"
            />
          </div>

          {/* Buy/Sell Panel */}
          <div className="bg-[#141414] border-t border-gray-800 p-4 grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-green-400 font-semibold mb-2">Buy</h3>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded p-2 mb-2 text-sm"
              />
              <button className="w-full bg-green-600 hover:bg-green-700 rounded py-2 text-white text-sm">
                Buy BTC
              </button>
            </div>
            <div>
              <h3 className="text-red-400 font-semibold mb-2">Sell</h3>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded p-2 mb-2 text-sm"
              />
              <button className="w-full bg-red-600 hover:bg-red-700 rounded py-2 text-white text-sm">
                Sell BTC
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar (Order Book) */}
        {showRight && (
          <aside className="w-64 bg-[#141414] border-l border-gray-800 overflow-y-auto hidden md:block">
            <div className="p-3 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-sm font-semibold">Order Book</h2>
              <button onClick={() => setShowRight(false)}>×</button>
            </div>
            <div className="p-3 text-xs">
              <div className="flex justify-between mb-1 text-gray-400">
                <span>Price (USDT)</span>
                <span>Amount</span>
              </div>
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`flex justify-between py-1 px-1 ${
                    i < 5 ? "text-red-400" : "text-green-400"
                  } hover:bg-[#1E1E1E] rounded`}
                >
                  <span>{(34000 + i * 10).toFixed(2)}</span>
                  <span>{(Math.random() * 1).toFixed(4)}</span>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Buttons */}
      <div className="absolute top-16 left-2 flex flex-col gap-2 md:hidden">
        {!showLeft && (
          <button
            onClick={() => setShowLeft(true)}
            className="bg-[#1E67AA] text-white text-xs px-2 py-1 rounded"
          >
            Show Markets
          </button>
        )}
        {!showRight && (
          <button
            onClick={() => setShowRight(true)}
            className="bg-[#1E67AA] text-white text-xs px-2 py-1 rounded"
          >
            Show Order Book
          </button>
        )}
      </div>
    </div>
  );
};

export default TradeDashboard;
