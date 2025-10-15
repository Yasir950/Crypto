import React, { useState } from "react";
import CoinItem from "./CoinItem";

function Coins({ coins }) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="rounded-div my-10 py-4 px-4 sm:px-10 md:px-20 lg:px-40 overflow-x-auto">
      <h1 className="text-center font-bold text-2xl sm:text-3xl pb-10 sm:pb-20">
        Today's Cryptocurrency Prices
      </h1>

      <table className="w-full border-collapse text-center min-w-[600px]">
        <thead className="dark:text-white text-sm sm:text-base">
          <tr className="border-b">
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th></th>
            <th>Price</th>
            <th>24h%</th>
            <th className="hidden md:table-cell">7d%</th>
            <th className="hidden md:table-cell">Market cap</th>
            <th>Last 7 days</th>
          </tr>
        </thead>
        <tbody className="dark:text-white text-sm sm:text-base">
          {coins
            .filter((value) => {
              if (searchText === "") return value;
              else if (
                value.name.toLowerCase().includes(searchText.toLowerCase())
              )
                return value;
            })
            .map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Coins;
