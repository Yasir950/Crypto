import React from "react";
import Banner from "../assets/banner.png";

function BannerComp() {
  // Smooth scroll handler
  const handleScroll = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center px-6 sm:px-10 lg:px-40 pt-10 pb-0 space-y-8 lg:space-y-0">
        {/* Left Section */}
        <div className="text-white text-center lg:text-left w-full lg:w-1/2">
          <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[60px]">
            Trade hundreds of cryptocurrencies and derivatives
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg">
            We offers users a fully operational long-term rental platform.
            <br />
            It plans to leverages blockchain technology.
          </p>
          <button
            className="text-btnText px-4 py-3 shadow-lg hover:shadow-xl mt-6"
            style={{
              backgroundColor: "#000",
              borderRadius: "20px",
            }}
          >
            Get Whitelisted
          </button>
        </div>

        {/* Right Section */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          <img
            src={Banner}
            alt="banner"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Scroll Mouse Icon */}
      <div
        onClick={handleScroll}
        className="flex justify-center mt-10 mb-10 animate-bounce cursor-pointer"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start p-1">
          <div className="w-1.5 h-2 bg-white rounded-full animate-scroll"></div>
        </div>
      </div>
    </div>
  );
}

export default BannerComp;
