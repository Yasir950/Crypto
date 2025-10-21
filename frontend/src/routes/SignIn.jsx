import React from "react";
import { useForm } from "react-hook-form";
import CryptoSection from "../components/cryptoSection";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../apiservice";
import { toast } from "react-toastify";

const LoginSection = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Handle form submission
  const onSubmit = async (data) => {
    const res = await userLogin(data);
    if (res) {
      toast.success(res.message);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      navigate("/account", { replace: true });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 w-full md:w-1/2 bg-white">
      <div className="flex items-center mb-8 sm:mb-20 mt-16 sm:mt-0">
        <div className="flex-1 h-[2px] bg-[#BFBFBF] w-[250px]"></div>
        <h2 className="px-4 text-3xl font-bold text-[#154470]">Log in</h2>
        <div className="flex-1 h-[2px] bg-[#BFBFBF]" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm"
        noValidate
      >
        {/* Email */}
        <div className="flex items-center bg-gray-100 p-3 rounded-md">
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email", { required: "Email is required" })}
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="flex items-center bg-gray-100 p-3 rounded-md mt-4">
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}

        {/* Remember Me */}
        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" id="remember" className="cursor-pointer" />
          <label htmlFor="remember" className="text-xs text-[#154470]">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-[#1E67AA] text-white py-2 px-6 shadow-[0_4px_6px_rgba(0,0,0,0.25)] text-sm"
          >
            Log in
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-16">
          <p className="text-center text-xs">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#154470] font-bold">
              SIGN UP
            </Link>
          </p>
        </div>
      </form>
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
