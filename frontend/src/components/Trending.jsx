import React, { useState } from "react";
import TrendingItem from "./TrendingItem";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";

function Trending() {
  const [data, setData] = useState([
    {
      item: {
        id: "havven",
        coin_id: 3406,
        name: "Ease of Trading",
        small: icon1,
        point1: "Intuitive interface",
        point2: "Instant deposit options",
        point3: "Cash out directly to your bank account",
      },
    },
    {
      item: {
        id: "aster-2",
        coin_id: 69040,
        name: "Institutional-grade Security",
        small: icon2,
        point1: "98% of assets stored safely offline",
        point2: "Highly encrypted personal data",
        point3: "Whitelisting and transaction confirmations",
      },
    },
    {
      item: {
        id: "chainopera-ai",
        coin_id: 69447,
        name: "Proven Reliability",
        small: icon3,
        point1: "Exchanging bitcoin since 2011",
        point2: "Industry-leading uptime",
        point3: "24/7 dedicated support",
      },
    },
  ]);

  return (
    <div className="text-white mt-20 sm:mt-32 md:mt-40 px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 py-10 sm:py-16 md:py-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-5 text-center mb-10 sm:mb-16 md:mb-20">
        The most trusted cryptocurrency platform
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {data.map((coin) => (
          <TrendingItem key={coin.item.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}

export default Trending;
