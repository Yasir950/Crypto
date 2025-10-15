import React from "react";
import LineAreaChart from "../components/areaChart";
import { Link } from "react-router-dom";

function Dashboard() {
  const [state, setState] = React.useState({
    selectedBar: "deposit",
  });
  return (
    <div className="min-h-screen bg-[#f4f4f4] sm:px-20 py-8 md:py-12 flex ">
      <div className="w-full max-w-4xl space-y-6">
        {/* Top info small card */}
        <div className="  p-4 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-gray-500">
            Test User<br></br>
            023416523125
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Email<br></br> test@gmail.com
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Identity verification{" >"} <br></br>
            <span className="font-medium text-gray-800">Verified</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Country/Region{" >"} <br></br>
            <span className="font-medium text-gray-800">Pakistan</span>
          </div>
        </div>

        {/* Portfolio box */}
        <div className=" rounded-2xl border border-gray-400 p-4 sm:p-6">
          <div className="flex flex-col  sm:items-start sm:justify-between gap-4">
            <div>
              <div className="text-xs text-gray-500">Estimated total value</div>
              <div className="mt-1 text-lg sm:text-xl font-semibold text-gray-900">
                1050.00 <span className="text-xs font-normal">USD</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                className={`text-xs px-3 py-1 rounded-full border border-gray-400 bg-white `}
                onClick={() => setState({ ...state, selectedBar: "deposit" })}
                style={
                  state.selectedBar === "deposit"
                    ? { backgroundColor: "#000", color: "white" }
                    : { backgroundColor: "white", color: "black" }
                }
              >
                Deposit
              </button>
              <Link to="/convert">
                <button
                  className="text-xs px-3 py-1 rounded-full border border-gray-400 bg-white"
                  onClick={() => setState({ ...state, selectedBar: "convert" })}
                  style={
                    state.selectedBar === "convert"
                      ? { backgroundColor: "#000", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                >
                  Convert
                </button>
              </Link>
              <Link to="/withdraw">
                <button
                  className="text-xs px-3 py-1 rounded-full border border-gray-400 bg-white"
                  onClick={() =>
                    setState({ ...state, selectedBar: "withdraw" })
                  }
                  style={
                    state.selectedBar === "withdraw"
                      ? { backgroundColor: "#000", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                >
                  Withdraw
                </button>
              </Link>
              <Link to="/transfer">
                <button
                  className="text-xs px-3 py-1 rounded-full border border-gray-400 bg-white"
                  onClick={() =>
                    setState({ ...state, selectedBar: "transfer" })
                  }
                  style={
                    state.selectedBar === "transfer"
                      ? { backgroundColor: "#000", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                >
                  Transfer
                </button>
              </Link>
            </div>
          </div>

          <div>
            <div className="mt-6">
              <div className="flex-1 w-full">
                <LineAreaChart />
              </div>
            </div>
            <hr className="border-t-2 border-[#949494] my-4" />
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-600">
                View my Assets &gt;
              </button>
            </div>
          </div>
          {/* Graph area */}
        </div>
        {/* Today's crypto prices */}
        <div className=" rounded-2xl border border-gray-200 p-2  overflow-x-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Today's crypto prices
              </h3>
            </div>

            <div className="mt-4 border-b">
              <nav className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-400">
                <button className="hover:text-gray-800">Favorites</button>
                <button className="text-gray-900 border-b-2 border-gray-900 pb-1">
                  Top
                </button>
                <button className="hover:text-gray-800">Hot</button>
                <button className="hover:text-gray-800">Gainers</button>
                <button className="hover:text-gray-800">New</button>
              </nav>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full mt-4 text-xs sm:text-sm font-normal min-w-[400px]">
                <thead>
                  <tr className="text-gray-400 text-left">
                    <th className="pb-2 font-normal">Name</th>
                    <th className="pb-2 font-normal">Price</th>
                    <th className="pb-2 font-normal">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      symbol: "BTC",
                      color: "bg-yellow-300",
                      price: "$122,764.4",
                      change: "+0.26%",
                      positive: true,
                    },
                    {
                      symbol: "ETH",
                      color: "bg-blue-200",
                      price: "$4,503.43",
                      change: "+0.30%",
                      positive: true,
                    },
                    {
                      symbol: "OKB",
                      color: "bg-gray-200",
                      price: "$220.84",
                      change: "-2.87%",
                      positive: false,
                    },
                    {
                      symbol: "SOL",
                      color: "bg-green-200",
                      price: "$228.57",
                      change: "+0.37%",
                      positive: true,
                    },
                    {
                      symbol: "DOGE",
                      color: "bg-pink-200",
                      price: "$0.25246",
                      change: "+0.67%",
                      positive: true,
                    },
                    {
                      symbol: "XRP",
                      color: "bg-purple-200",
                      price: "$2.9758",
                      change: "+0.21%",
                      positive: true,
                    },
                    {
                      symbol: "BCH",
                      color: "bg-yellow-100",
                      price: "$692.30",
                      change: "+0.34%",
                      positive: true,
                    },
                  ].map((coin, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-3 flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full ${coin.color} flex items-center justify-center text-xs font-semibold`}
                        >
                          {coin.symbol[0]}
                        </div>
                        <span className="font-medium">{coin.symbol}</span>
                      </td>
                      <td className="py-3">{coin.price}</td>
                      <td
                        className={`py-3 ${
                          coin.positive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {coin.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-5">
              <button className="text-sm text-[#000]  border-b-2 border-[#000]">
                View more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
