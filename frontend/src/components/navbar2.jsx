import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const tradeRef = useRef(null);
  const moreRef = useRef(null);
  const profileRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (tradeRef.current && tradeRef.current.contains(event.target)) ||
        (moreRef.current && moreRef.current.contains(event.target)) ||
        (profileRef.current && profileRef.current.contains(event.target))
      ) {
        return; // clicked inside dropdown
      }
      setOpenDropdown(null); // clicked outside
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <nav className="bg-black text-white py-4 px-6 md:px-12 flex justify-between items-center relative">
      {/* Left Menu */}
      <div className="flex space-x-6 text-sm font-medium">
        <Link to="/">
          <div className="cursor-pointer hover:text-gray-300">Buy Crypto</div>
        </Link>

        <Link to="/">
          <div className="cursor-pointer hover:text-gray-300">Markets</div>
        </Link>

        {/* Trade Dropdown */}
        <div className="relative" ref={tradeRef}>
          <div
            onClick={() => toggleDropdown("trade")}
            className="cursor-pointer hover:text-gray-300"
          >
            Trade ▾
          </div>

          {openDropdown === "trade" && (
            <div className="absolute left-0 mt-2 w-40 bg-black text-white rounded-sm overflow-hidden z-50">
              <Link
                to="/convert"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={() => setOpenDropdown(null)}
              >
                Convert
              </Link>
              <Link
                to="/deposit"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={() => setOpenDropdown(null)}
              >
                Deposit
              </Link>
              <Link
                to="/withdraw"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={() => setOpenDropdown(null)}
              >
                Withdraw
              </Link>
              <Link
                to="/transfer"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={() => setOpenDropdown(null)}
              >
                Transfer
              </Link>
            </div>
          )}
        </div>

        {/* More Dropdown */}
        <div className="relative" ref={moreRef}>
          <div
            onClick={() => toggleDropdown("more")}
            className="cursor-pointer hover:text-gray-300"
          >
            More ▾
          </div>

          {openDropdown === "more" && (
            <div className="absolute left-0 mt-2 w-44 bg-black text-white rounded-sm overflow-hidden z-50">
              <Link
                to="/verification"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={() => setOpenDropdown(null)}
              >
                ID Verification
              </Link>
              <Link
                to="/support"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={() => setOpenDropdown(null)}
              >
                Support
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Profile Dropdown */}
      {user && (
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => toggleDropdown("profile")}
            className="cursor-pointer flex items-center gap-2 hover:opacity-80"
          >
            <div className="w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center bg-gray-700 text-white text-lg font-semibold">
              {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>

          {openDropdown === "profile" && (
            <div className="absolute right-0 mt-2 w-44 bg-black text-white rounded-sm  overflow-hidden z-50">
              <Link
                to="/profile"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Profile
              </Link>
              <Link
                to="/"
                onClick={logout}
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
