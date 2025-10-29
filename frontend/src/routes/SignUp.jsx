import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CryptoSection from "../components/cryptoSection";
import { saveData } from "../apiservice";

const SignupSection = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    agreed: false,
  });

  const handleAgree = () => {
    setState((prevState) => ({ ...prevState, agreed: !prevState.agreed }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // ✅ Get all available timezones (from Intl API)
  const timezones = React.useMemo(() => Intl.supportedValuesOf("timeZone"), []);

  // ✅ Default timezone based on user's system
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // ✅ Submit handler
  const onSubmit = async (data) => {
    if (!state.agreed) {
      toast.error("You must agree to the Terms and Conditions");
      return;
    }

    const res = await saveData(data, "users");
    if (res) {
      toast.success(res.message);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      navigate("/signin", { replace: true });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 w-full md:w-1/2 bg-white">
      <div className="flex items-center mb-8">
        <div className="flex-1 h-[2px] bg-[#BFBFBF] w-[250px]"></div>
        <h2 className="px-4 text-3xl font-bold text-[#154470]">Sign up</h2>
        <div className="flex-1 h-[2px] bg-[#BFBFBF]" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-[#154470] mb-4">
          Create an account
        </h2>

        {/* Username */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470] text-[#154470]"
          />
        </div>
        {errors.username && (
          <p className="text-red-500 text-xs">{errors.username.message}</p>
        )}

        {/* Full Name */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <input
            {...register("fullname", { required: "Full name is required" })}
            placeholder="Your Full Name"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470] text-[#154470]"
          />
        </div>
        {errors.fullname && (
          <p className="text-red-500 text-xs">{errors.fullname.message}</p>
        )}

        {/* Email */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470] text-[#154470]"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        {/* Country */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <select
            {...register("country")}
            className="bg-transparent outline-none text-sm w-full text-[#154470]"
            defaultValue=""
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="Pakistan">Pakistan</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="UAE">United Arab Emirates</option>
            <option value="India">India</option>
          </select>
        </div>

        {/* Currency */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <select
            {...register("currency")}
            className="bg-transparent outline-none text-sm w-full text-[#154470]"
            defaultValue=""
          >
            <option value="" disabled>
              Select Currency
            </option>
            <option value="PKR">PKR — Pakistani Rupee</option>
            <option value="USD">USD — US Dollar</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="AED">AED — Dirham</option>
            <option value="INR">INR — Indian Rupee</option>
          </select>
        </div>

        {/* ✅ Timezone Dropdown */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <select
            {...register("timezone", { required: "Timezone is required" })}
            defaultValue={defaultTimezone}
            className="bg-transparent outline-none text-sm w-full text-[#154470]"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        {errors.timezone && (
          <p className="text-red-500 text-xs">{errors.timezone.message}</p>
        )}

        {/* Phone */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <input
            {...register("phone")}
            placeholder="Enter Phone Number"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470]"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none text-sm w-full placeholder-[#154470] text-[#154470]"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        {/* Submit */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1E67AA] text-white py-2 px-6 shadow-[0_4px_6px_rgba(0,0,0,0.25)] text-sm disabled:opacity-70"
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </div>

        {/* Agreement */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="remember"
            className="cursor-pointer"
            onChange={handleAgree}
            checked={state.agreed}
          />
          <label htmlFor="remember" className="text-xs text-gray-500">
            I agree to Forex Synals{" "}
            <Link to="#" className="underline text-[#1E67AA]">
              Terms and Conditions
            </Link>
          </label>
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
        <SignupSection />
      </div>
    </div>
  );
};

export default App;
