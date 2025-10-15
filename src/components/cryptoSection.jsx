import React from "react";
import Card1 from "../assets/sign-card1.png";
import Card2 from "../assets/sign-card2.png";
import Card3 from "../assets/sign-card3.png";
import Card4 from "../assets/sign-card4.png";
import Graph from "../assets/graph.png";

const CryptoSection = () => {
  return (
    <div className="relative hidden md:flex items-center justify-center md:w-1/2 min-h-[680px] overflow-hidden">
      <img
        src={Card1}
        alt="Bitcoin card"
        className="absolute top-2 left-12 w-[16rem]"
      />
      <img
        src={Card2}
        alt="Litecoin card"
        className="absolute top-[9rem] right-30 w-[16rem]"
      />
      <img
        src={Card3}
        alt="Ethereum card"
        className="absolute bottom-[12rem] left-16 w-[16rem]"
      />
      <img
        src={Card4}
        alt="Solana card"
        className="absolute sm:bottom-[8rem] bottom-[3rem] right-24 w-[16rem]"
      />
      <img
        src={Graph}
        alt="Crypto graph"
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
};

export default CryptoSection;
