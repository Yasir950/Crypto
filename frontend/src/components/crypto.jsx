import React, { useMemo, useState } from "react";

/**
 * MarketCapDashboard.jsx
 * Single-file implementation of the "Cryptocurrency Prices by Market Cap" UI.
 *
 * Drop into your React app and ensure TailwindCSS is enabled.
 */

const topCards = [
  {
    name: "Ethereum",
    price: "$3,189.24",
    change: "+1.2%",
    spark: randomSpark(),
  },
  { name: "Binance", price: "$318.40", change: "+0.8%", spark: randomSpark() },
  { name: "Litecoin", price: "$108.40", change: "-0.4%", spark: randomSpark() },
  { name: "Polygon", price: "$0.98", change: "+2.4%", spark: randomSpark() },
];

function randomSpark() {
  // generate 12 random points for sparkline
  return Array.from({ length: 12 }, () => Math.random() * (1 - 0) + 0);
}

function Sparkline({
  data = [],
  width = 80,
  height = 28,
  stroke = "rgb(30 103 170)",
}) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data
    .map((d, i) => {
      const x = i * step;
      const y = height - ((d - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

const sampleRows = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$43,579.72",
    change24: "+0.98%",
    marketCap: "$824,727.9",
    volume24: "$24,478,000",
    spark: randomSpark(),
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,189.24",
    change24: "-2.70%",
    marketCap: "$380,921.2",
    volume24: "$10,823,000",
    spark: randomSpark(),
  },
  {
    rank: 3,
    name: "XRP",
    symbol: "XRP",
    price: "$0.87",
    change24: "+1.10%",
    marketCap: "$42,123.3",
    volume24: "$3,212,000",
    spark: randomSpark(),
  },
  {
    rank: 4,
    name: "Litecoin",
    symbol: "LTC",
    price: "$138.61",
    change24: "+0.38%",
    marketCap: "$9,123.1",
    volume24: "$1,234,000",
    spark: randomSpark(),
  },
  // ... add more rows as needed
];

export default function MartketComp() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Top Gainers");
  const [rows] = useState(sampleRows);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.symbol.toLowerCase().includes(q) ||
        String(r.rank).includes(q)
    );
  }, [rows, query]);

  return (
    <div className="min-h-screen bg-[#0B0E12] text-gray-200 p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Top nav */}

        {/* Hero / heading */}
        <div className="bg-[#0F1417] rounded-xl p-6 mb-6 border border-gray-800">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-2">
                Cryptocurrency Prices by Market Cap
              </h1>
              <p className="text-sm text-gray-400 max-w-xl">
                Overview of coin prices, market caps and tiny trend lines —
                updated frequently.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <div className="bg-[#0B1214] p-2 rounded-md border border-gray-800">
                <select className="bg-transparent text-gray-200 text-sm outline-none">
                  <option>Today</option>
                  <option>7d</option>
                  <option>1M</option>
                </select>
              </div>
              <div className="bg-[#0B1214] p-2 rounded-md border border-gray-800">
                <input
                  placeholder="Search coin name"
                  className="bg-transparent text-gray-200 text-sm outline-none w-48"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button className="bg-[#1E67AA] text-white text-sm px-4 py-2 rounded-md shadow-sm">
                Export
              </button>
            </div>
          </div>

          {/* small highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
            {topCards.map((c, idx) => (
              <div
                key={idx}
                className="bg-[#071017] p-4 rounded-lg border border-gray-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-gray-400">{c.name}</div>
                  <div className="font-medium text-white">{c.price}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`text-sm ${
                      c.change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {c.change}
                  </div>
                  <div className="mt-2">
                    <Sparkline
                      data={c.spark}
                      width={84}
                      height={28}
                      stroke="#1E67AA"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls / Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            {["Top Gainers", "Top Loser", "New in market", "Top trading"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`text-sm px-3 py-1 rounded-md ${
                    activeTab === t
                      ? "bg-[#1E67AA] text-white"
                      : "text-gray-300 bg-[#0E1417] border border-gray-800"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">Show</div>
            <select className="bg-[#071017] text-sm p-1 rounded border border-gray-800">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <button className="bg-[#0B1214] text-sm px-3 py-1 rounded border border-gray-800">
              Customize
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#071017] border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Category • Algorithm • Platform • Industry
            </div>
            <div className="flex items-center gap-3">
              <button className="text-xs text-gray-400">Filter</button>
              <div className="text-xs text-gray-500">
                Showing {filtered.length} results
              </div>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#071017] sticky top-0">
                <tr className="text-left text-xs text-gray-400">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Coin Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">24h</th>
                  <th className="px-4 py-3">Market Cap</th>
                  <th className="px-4 py-3">24h Vol</th>
                  <th className="px-4 py-3 pr-8">Last 7d</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((r, idx) => (
                  <tr
                    key={r.rank}
                    className="border-b border-gray-800 hover:bg-[#0b1316]"
                  >
                    <td className="px-4 py-3 text-gray-300">{r.rank}</td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E67AA] to-[#72C6FF] flex items-center justify-center text-xs font-semibold">
                        {r.symbol[0]}
                      </div>
                      <div>
                        <div className="text-white font-medium">{r.name}</div>
                        <div className="text-xs text-gray-400">{r.symbol}</div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-white font-medium">
                      {r.price}
                    </td>

                    <td
                      className={`px-4 py-3 ${
                        r.change24.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {r.change24}
                    </td>

                    <td className="px-4 py-3 text-gray-300">{r.marketCap}</td>

                    <td className="px-4 py-3 text-gray-300">{r.volume24}</td>

                    <td className="px-4 py-3 pr-8">
                      <div className="flex items-center justify-end gap-3">
                        <Sparkline
                          data={r.spark}
                          width={120}
                          height={30}
                          stroke={
                            r.change24.startsWith("+") ? "#21d07a" : "#ff6b6b"
                          }
                        />
                        <button className="text-xs text-gray-400">...</button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-400 py-8">
                      No results
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* footer pagination */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-800">
            <div className="text-xs text-gray-400">1-20 of 3,483 assets</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-[#0B1214] border border-gray-800 rounded text-sm">
                Prev
              </button>
              <button className="px-3 py-1 bg-[#1E67AA] rounded text-sm text-white">
                1
              </button>
              <button className="px-3 py-1 bg-[#0B1214] border border-gray-800 rounded text-sm">
                2
              </button>
              <button className="px-3 py-1 bg-[#0B1214] border border-gray-800 rounded text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
