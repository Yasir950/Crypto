import React from "react";
import CryptoSection from "../components/cryptoSection";
import { Link } from "react-router-dom";

const LoginSection = () => {
  return (
    <div className="flex flex-col justify-center items-center p-8 w-full md:w-1/2 bg-white">
      <div className="flex items-center mb-8">
        <div className="flex-1 h-[2px] bg-[#BFBFBF] w-[250px]"></div>
        <h2 className="px-4 text-3xl font-bold text-[#154470]">Sign up</h2>
        <div className="flex-1 h-[2px] bg-[#BFBFBF]" />
      </div>

      <div className=" w-full max-w-sm">
        <h2 className=" text-xl font-bold text-[#154470] mb-4">
          Create an account
        </h2>
        <div className="flex items-center bg-gray-100 p-2 rounded-md ">
          {/* <Mail className="text-gray-500 mr-2" size={18} /> */}
          <input
            placeholder="UserName"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-4">
          {/* <Key className="text-gray-500 mr-2" size={18} /> */}
          <input
            placeholder="Your Full Name"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-4">
          {/* <Key className="text-gray-500 mr-2" size={18} /> */}
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-4">
          <select
            className="bg-transparent outline-none text-sm w-full text-[#154470]"
            defaultValue=""
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="pakistan">Pakistan</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="uae">United Arab Emirates</option>
            <option value="india">India</option>
          </select>
        </div>

        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-4">
          <select
            className="bg-transparent outline-none text-sm w-full text-[#154470]"
            defaultValue=""
          >
            <option value="" disabled>
              Select Currency
            </option>
            <option value="pkr">PKR — Pakistani Rupee</option>
            <option value="usd">USD — US Dollar</option>
            <option value="gbp">GBP — British Pound</option>
            <option value="aed">AED — Dirham</option>
            <option value="inr">INR — Indian Rupee</option>
          </select>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-4">
          {/* <Key className="text-gray-500 mr-2" size={18} /> */}
          <input
            placeholder="Enter PHone Number"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-md mt-4">
          {/* <Key className="text-gray-500 mr-2" size={18} /> */}
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>
        <div className="flex justify-center mt-4 ">
          <button className="bg-[#1E67AA] text-white py-2 px-6  shadow-[0_4px_6px_rgba(0,0,0,0.25)] text-sm">
            Sign up
          </button>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" id="remember" className="cursor-pointer" />
          <label htmlFor="remember" className="text-xs text-gray-500">
            I agree to Forex Synals{" "}
            <Link to="#" className="underline text-[#1E67AA]">
              Terms and Conditions
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-1 sm:bg-[#161616] bg-white">
        <CryptoSection />
        <LoginSection />
      </div>
    </div>
  );
};

export default App;
