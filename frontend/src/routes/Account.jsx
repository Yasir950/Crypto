import React, { useState, useEffect } from "react";
import LineAreaChart from "../components/areaChart";
import { Link } from "react-router-dom";
import AccountStatement from "../components/accStatement";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [coins, setCoins] = useState([]);
  const [tab, setTab] = useState("top");
  const [state, setState] = useState({
    selectedBar: "deposit",
    viewAssets: false,
  });

  useEffect(() => {
    async function fetchCoins() {
      let url = "";

      // Use CoinCap endpoints instead of CoinGecko
      if (tab === "top")
        url = "https://api.coincap.io/v2/assets?limit=10"; // top by market cap
      else if (tab === "hot")
        url =
          "https://api.coincap.io/v2/assets?limit=10&sort=volumeUsd24Hr"; // top by volume
      else if (tab === "gainers")
        url =
          "https://api.coincap.io/v2/assets?limit=10&sort=changePercent24Hr"; // biggest % gainers
      else if (tab === "new")
        url = "https://api.coincap.io/v2/assets?limit=10&sort=supply"; // use supply sort for variety

      try {
        const res = await fetch(url);
        const json = await res.json();

        if (json?.data) setCoins(json.data);
        else setCoins([]);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setCoins([]);
      }
    }

    fetchCoins();
  }, [tab]);

  const changeView = () => {
    setState((prev) => ({ ...prev, viewAssets: !prev.viewAssets }));
  };

  return (
    <>
      {!state.viewAssets ? (
        <div className="min-h-screen bg-[#f4f4f4] sm:px-20 py-8 md:py-12 flex ">
          <div className="w-full max-w-4xl space-y-6">
            {/* Top info */}
            <div className="p-4 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500">
                {user.fullname}
                <br />
                {user.phone}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                Email
                <br /> {user.email}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                Identity verification {" >"} <br />
                <span className="font-medium text-gray-800">Verified</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                Country/Region {" >"} <br />
                <span className="font-medium text-gray-800">
                  {user.country}
                </span>
              </div>
            </div>

            {/* Portfolio box */}
            <div className="rounded-2xl border border-gray-400 p-4 sm:p-6">
              <div className="flex flex-col sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-500">
                    Estimated total value
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-semibold text-gray-900">
                    1050.00 <span className="text-xs font-normal">USD</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {["deposit", "convert", "withdraw", "transfer"].map(
                    (item) => (
                      <Link key={item} to={`/${item}`}>
                        <button
                          className="text-xs px-3 py-1 rounded-full border border-gray-400 bg-white"
                          onClick={() =>
                            setState({ ...state, selectedBar: item })
                          }
                          style={
                            state.selectedBar === item
                              ? { backgroundColor: "#000", color: "white" }
                              : { backgroundColor: "white", color: "black" }
                          }
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                      </Link>
                    )
                  )}
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
                  <button
                    className="text-sm text-gray-600"
                    onClick={changeView}
                  >
                    View my Assets &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Today's crypto prices */}
            <div className="p-4 bg-white rounded-2xl">
              <nav className="flex gap-6 text-sm text-gray-400 border-b pb-2">
                {["top", "hot", "gainers", "new"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`capitalize ${
                      tab === t
                        ? "text-black border-b-2 border-black"
                        : "hover:text-black"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </nav>

              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="text-gray-400">
                    <th className="text-left">Name</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((coin) => (
                    <tr key={coin.id} className="border-t">
                      <td className="py-2 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold uppercase">
                          {coin.symbol?.[0] || "?"}
                        </div>
                        {coin.symbol?.toUpperCase() || coin.name}
                      </td>
                      <td className="py-2">
                        ${Number(coin.priceUsd || 0).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 ${
                          parseFloat(coin.changePercent24Hr) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {parseFloat(coin.changePercent24Hr || 0).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <AccountStatement />
      )}
    </>
  );
}

export default Dashboard;
