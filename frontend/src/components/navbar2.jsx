import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const user = localStorage.getItem("user");
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
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
      <div className="flex space-x-6 text-sm font-medium" ref={dropdownRef}>
        <Link to="/">
          <div className="cursor-pointer hover:text-gray-300">Buy Crypto </div>
        </Link>

        <Link to="/market">
          <div className="cursor-pointer hover:text-gray-300">Markets</div>
        </Link>

        {/* Trade Dropdown */}
        <div className="relative">
          <div
            onClick={() => toggleDropdown("trade")}
            className="cursor-pointer hover:text-gray-300"
          >
            Trade ▾
          </div>

          {openDropdown === "trade" && (
            <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              <Link
                to="/convert"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Convert
              </Link>
              <Link
                to="/deposit"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Deposit
              </Link>
              <Link
                to="/withdraw"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Withdraw
              </Link>
              <Link
                to="/transfer"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Transfer
              </Link>
            </div>
          )}
        </div>

        {/* More Dropdown */}
        <div className="relative">
          <div
            onClick={() => toggleDropdown("more")}
            className="cursor-pointer hover:text-gray-300"
          >
            More ▾
          </div>

          {openDropdown === "more" && (
            <div className="absolute left-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              <Link
                to="/id-verification"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                ID Verification
              </Link>
              <Link
                to="/support"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Support
              </Link>
            </div>
          )}
        </div>
      </div>
      {user && (
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => toggleDropdown("profile")}
            className="cursor-pointer flex items-center gap-2 hover:opacity-80"
          >
            <img
              src="https://i.pravatar.cc/40" // Replace with your profile image or state-based avatar
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-gray-500"
            />
          </div>

          {openDropdown === "profile" && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              <Link
                to="/profile"
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/"
                onClick={() => logout()}
                className="block px-4 py-2 hover:bg-gray-100"
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
