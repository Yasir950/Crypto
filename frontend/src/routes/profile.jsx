import React, { useState } from "react";
import { updateUser } from "../apiservice";
import { toast } from "react-toastify";

export function UserProfileComp() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  // Initial user info
  const [userInfo, setUserInfo] = useState({
    user_name: user.user_name || "",
    full_name: user.full_name || "",
    currency: user.currency || "",
    phone: user.phone || "",
  });

  // Track which field is currently being edited
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = async (field) => {
    setUserInfo((prev) => ({ ...prev, [field]: tempValue }));
    const res = await updateUser(
      { ...userInfo, [field]: tempValue },
      user.user_id
    );
    if (res.user) {
      toast.success("Profile updated successfully");
      localStorage.setItem("user", JSON.stringify(res.user));
      setEditingField(null);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const accountInfo = [
    { label: "User Name", key: "user_name" },
    { label: "Full Name", key: "full_name" },
    { label: "Currency", key: "currency" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="px-4 sm:px-8 md:px-20 py-8 md:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Profile</h1>

        <div className="space-y-8">
          {/* Account Information */}
          <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4">
            <img
              src="/purify-logo.png"
              alt="Logo"
              className="w-20 h-20 rounded-full object-contain border mx-auto md:mx-0"
            />

            <div className="space-y-4 text-sm sm:text-base w-full md:w-[600px]">
              <div className="flex items-center space-x-6 mb-4">
                <h2 className="text-2xl font-semibold">Account information</h2>
              </div>

              {accountInfo.map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#B2B2B2] pb-3"
                >
                  <div className="text-gray-700 font-medium w-full sm:w-40">
                    {item.label}
                  </div>

                  {/* Editable Field */}
                  {editingField === item.key ? (
                    <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700 w-full sm:w-60"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
                        <button
                          onClick={() => handleSave(item.key)}
                          className="border border-green-500 text-green-600 rounded-2xl px-3 py-1 text-sm hover:bg-green-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="border border-gray-400 text-gray-500 rounded-2xl px-3 py-1 text-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full sm:w-auto">
                      <span className="text-gray-500 mt-1 sm:mt-0">
                        {userInfo[item.key]}
                      </span>
                      <button
                        onClick={() => handleEdit(item.key, userInfo[item.key])}
                        className="mt-2 sm:mt-0 ml-0 sm:ml-4 border border-gray-300 rounded-2xl px-3 py-1 text-sm hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Verification Details */}
          <div className="p-4 sm:p-6 md:pl-[120px]">
            <h2 className="text-2xl font-semibold mb-4">
              Verification details
            </h2>
            <div className="space-y-4 text-sm sm:text-base w-full md:w-[600px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#B2B2B2] pb-3">
                <div className="text-gray-700 font-medium w-full sm:w-40">
                  Identity verification
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full sm:w-auto">
                  <span className="text-green-600 font-semibold">Verified</span>
                  <button className="mt-2 sm:mt-0 ml-0 sm:ml-4 border border-gray-300 rounded-2xl px-3 py-1 text-sm hover:bg-gray-50">
                    View details
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="text-gray-700 font-medium w-full sm:w-40">
                  Country/Region
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full sm:w-auto">
                  <span className="text-gray-500">Turkey</span>
                  <button className="mt-2 sm:mt-0 ml-0 sm:ml-4 border border-gray-300 rounded-2xl px-3 py-1 text-sm hover:bg-gray-50">
                    View details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Profile */}
          <div className="p-4 sm:p-6 md:pl-[120px]">
            <h2 className="text-2xl font-semibold mb-4">Trading profile</h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full md:w-[600px]">
              <div className="text-gray-700 font-medium w-full sm:w-40">
                Trading fee tier
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full sm:w-auto">
                <span className="text-gray-500">Regular user</span>
                <button className="mt-2 sm:mt-0 ml-0 sm:ml-4 border border-gray-300 rounded-2xl px-3 py-1 text-sm hover:bg-gray-50">
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-blue-900 h-10 w-full mt-10"></footer>
    </div>
  );
}
