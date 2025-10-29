import React from "react";
import { useForm } from "react-hook-form";
import Verified from "../assets/verified.png";
import { useState } from "react";
import { saveForm } from "../apiservice";
import { toast } from "react-toastify";
export default function IDVerificationForm() {
  const [state, setState] = React.useState({
    verified: false,
    agreed: false,
  });
  const [selectedType, setSelectedType] = useState("");
  const handleAgree = () => {
    setState((prevState) => ({ ...prevState, agreed: !prevState.agreed }));
  };
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setValue("type", type); // add it to the form data
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!state.agreed) {
      toast.error("You must agree to the Terms and Conditions");
      return;
    }
    console.log(user);
    const formData = new FormData();
    formData.append("user_id", user.id); // replace with logged-in user ID
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("dob", data.dob);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("nationality", data.nationality);
    formData.append("type", data.type);

    // ✅ Append file objects
    formData.append("image_fs", data.image_fs[0]);
    formData.append("image_bs", data.image_bs[0]);

    const res = await saveForm(formData);

    if (res?.success) {
      toast.success(res.message);
      setState({ ...state, verified: true });
    } else {
      toast.error(res?.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Form */}
      {!state.verified ? (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold mb-4">
            Begin your ID-Verification
          </h1>
          <p className="text-center text-sm text-gray-600 mb-8">
            To comply with regulations, all users must complete identity
            verification using a valid ID document and a recent formal headshot.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 border border-gray-300 "
          >
            {/* Personal Details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
              <p className="text-sm text-gray-600 mb-4">
                Enter details exactly as they appear on your identification
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    {...register("dob", {
                      required: "Date of birth is required",
                    })}
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm">{errors.dob.message}</p>
                  )}
                </div>
              </div>
            </div>

            <hr />

            {/* Address */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Your Address</h2>
              <p className="text-sm text-gray-600 mb-4">
                Enter details exactly as they appear on your identification
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line
                  </label>
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    {...register("state", { required: "State is required" })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality
                  </label>
                  <input
                    {...register("nationality", {
                      required: "Nationality is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-sm">
                      {errors.nationality.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <hr />

            {/* Document Upload */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Document Upload</h2>
              <p className="text-sm text-gray-600 mb-4">
                Your simple personal document required for identification
              </p>
              <hr className="mb-8" />

              <div className="flex flex-wrap gap-3 mb-12 justify-center ">
                {["Passport", "National ID", "Driving License"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeSelect(type)}
                    className={`border rounded-md px-4 py-2 text-base font-bold transition-colors duration-200
              ${
                selectedType === type
                  ? "bg-[#0054A2] text-white border-[#0054A2]"
                  : "border-gray-300 text-[#0054A2] hover:bg-gray-100"
              }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <p className="text-xl font-semibold  mb-8">
                To avoid delays when verifying account, please make sure your
                document meets the criteria below.
              </p>
              <ul className="list-disc pl-5 mb-8">
                <li>Chosen credential must not have expired.</li>
                <li>
                  Document should be in good condition and clearly visible.
                </li>
                <li>Make sure that there is no light glare on the document.</li>
              </ul>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload ID Front
                  </label>
                  <input
                    type="file"
                    {...register("image_fs", {
                      required: "ID front is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.image_fs && (
                    <p className="text-red-500 text-sm">
                      {errors.image_fs.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload ID Back
                  </label>
                  <input
                    type="file"
                    {...register("image_bs", {
                      required: "ID back is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.image_bs && (
                    <p className="text-red-500 text-sm">
                      {errors.image_bs.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 px-8">
              <input
                type="checkbox"
                id="remember"
                onChange={handleAgree}
                value={state.agreed}
                className="cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs ">
                All The Information I Have Entered Is Correct.
              </label>
            </div>
            <div className="text-center p-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      ) : (
        <section className=" mx-auto py-10 px-4 sm:px-6 lg:px-8  flex items-center justify-center flex-col text-center">
          <img src={Verified} alt="Verified" className="mb-4" />
          <h3 className="text-6xl font-bold mb-8">Identity verified</h3>
          <p className="text-3xl text-gray-600">
            You’ve completed your identity verification. Get started on your
            crypto journey now.
          </p>
        </section>
      )}
    </div>
  );
}
