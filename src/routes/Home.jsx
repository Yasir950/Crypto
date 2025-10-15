import React from "react";
import Coins from "../components/Coins";
import Trending from "../components/Trending";
import BannerComp from "../components/banner";
import Mobile from "../components/mobile";
import TailendSection from "../components/tailend";

function Home(props) {
  return (
    <div>
      <BannerComp />
      <div id="next-section">
        <Coins coins={props.coins} />
      </div>
      <Trending />
      <Mobile />
      <TailendSection />
    </div>
  );
}

export default Home;
