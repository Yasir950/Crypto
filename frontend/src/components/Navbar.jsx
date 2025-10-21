import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="text-white flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:h-20 h-auto px-4 sm:px-10 py-3 sm:py-0 relative">
      <div></div>
      {/* Center Section */}
      <div className="flex flex-wrap justify-center items-center w-full sm:w-auto space-x-4 sm:space-x-6 mb-3 sm:mb-0">
        <Link to="/">
          <p className="text-sm sm:text-base">Home</p>
        </Link>
        <Link to="/">
          <p className="text-sm sm:text-base">Company</p>
        </Link>
        <Link to="/">
          <p className="text-sm sm:text-base">About</p>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4 sm:pr-20">
        {user?.email ? (
          <div className="flex items-center space-x-3">
            <Link to="/account">
              <CgProfile className="cursor-pointer" size={24} />
            </Link>
            <button
              onClick={handleSignOut}
              className="text-sm sm:text-base whitespace-nowrap"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link to="/signin" className="text-sm sm:text-base whitespace-nowrap">
            Trade Now
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
