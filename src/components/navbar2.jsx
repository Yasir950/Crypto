import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex space-x-6 text-sm font-medium">
        <Link to="/">
          <div className="cursor-pointer">Buy Crypto ▾</div>
        </Link>
        <div className="cursor-pointer">Markets</div>
        <div className="cursor-pointer">Trade ▾</div>
        <div className="cursor-pointer">More ▾</div>
      </div>
    </nav>
  );
};

export default Navbar2;
