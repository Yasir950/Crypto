import React from "react";
import { useForm } from "react-hook-form";
import Verified from "../assets/verified.png";
export default function IDVerificationForm() {
  const [state, setState] = React.useState({
    verified: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setState({ ...state, verified: true });
    console.log(data);
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
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
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

            {/* Address */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Your Address</h2>
              <p className="text-sm text-gray-600 mb-4">
                Enter details exactly as they appear on your identification
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street
                  </label>
                  <input
                    {...register("street", { required: "Street is required" })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm">
                      {errors.street.message}
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
                    Postal Code
                  </label>
                  <input
                    {...register("postalCode", {
                      required: "Postal code is required",
                    })}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm">
                      {errors.postalCode.message}
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
                    className="border border-gray-300 rounded-md px-4 py-2 text-base font-bold text-[#0054A2] hover:bg-gray-100"
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
                    {...register("idFront", {
                      required: "ID front is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.idFront && (
                    <p className="text-red-500 text-sm">
                      {errors.idFront.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload ID Back
                  </label>
                  <input
                    type="file"
                    {...register("idBack", { required: "ID back is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.idBack && (
                    <p className="text-red-500 text-sm">
                      {errors.idBack.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 px-8">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
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
