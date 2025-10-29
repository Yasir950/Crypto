import React, { useState, useMemo, useEffect } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { depositAmount, getDataById } from "../apiservice";
const WALLET_MAP = {
  USDT: "TNibKBzQAcwurnCDdv89E2WMo1WdtN8sWF",
  Ethereum: "0x4Df76D9d6A9321aBD9B8fC4F5b36eA6bC4fE29C5",
  Bitcoin: "bc1qv9n0x9skf0a4y9x6z7f9n3q",
  BNB: "bnb1q4wz0exampleaddress123",
};

export default function Deposit() {
  const [step, setStep] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    getDeposit();
    return () => {};
  }, []);

  const getDeposit = async () => {
    let res = await getDataById("deposit", user.id);
    if (res.success) {
      setDeposits(res.deposits);
    }
  };
  const walletAddress = useMemo(
    () => WALLET_MAP[selectedCoin] ?? "Not available",
    [selectedCoin]
  );

  const handleContinue = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast.error("Wallet address copied to clipboard");
    } catch {
      toast.error("Copy failed — select and copy manually");
    }
  };

  // ✅ Submit proof using FormData
  const handleSubmitProof = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!proofFile) {
      toast.error("Please attach proof of deposit");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("payment_method", selectedCoin);
      formData.append("amount", amount);
      formData.append("hashcode", walletAddress);
      formData.append("proof_image", proofFile);

      // ✅ Send data to backend (adjust API URL as needed)
      const res = await depositAmount(formData);

      if (res.success) {
        toast.success("Amount submitted successfully!");
        getDeposit();
        setAmount("");
        setProofFile(null);
        setStep(1);
      } else {
        toast.error(res.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Something went wrong while submitting deposit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold ">Deposit</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Step 1 */}
        {step === 1 && (
          <>
            <section className="bg-white rounded-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Select Payment Method
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <select
                  aria-label="Select coin"
                  className="flex-1 border rounded-md px-4 py-3"
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                >
                  {Object.keys(WALLET_MAP).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleContinue}
                  className="text-white px-4 py-3 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: "#000", borderRadius: "20px" }}
                >
                  Continue
                </button>
              </div>
            </section>

            <section className="p-4">
              <h3 className="text-2xl font-semibold mb-6">Deposit History</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr className="text-gray-700 text-sm uppercase">
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Payment Method</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-left">Hashcode</th>
                      <th className="px-4 py-3 text-left">Proof</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {deposits.length > 0 ? (
                      deposits.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.payment_method}</td>
                          <td className="px-4 py-2">${item.amount}</td>
                          <td className="px-4 py-2 text-sm break-all text-gray-600">
                            {item.hashcode}
                          </td>
                          <td className="px-4 py-2">
                            <a
                              href={item.proof_image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Proof
                            </a>
                          </td>
                          <td
                            className={`px-4 py-2 font-medium ${
                              item.status === "Pending"
                                ? "text-yellow-600"
                                : item.status === "Approved"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.status}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-6 text-gray-500"
                        >
                          No deposit history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <section className=" p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                Add Fund ({selectedCoin})
              </h2>
              <button
                onClick={handleBack}
                className="text-sm text-gray-600 underline"
              >
                ← Back
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className=" p-6 w-full flex flex-col items-center">
                  <div className="mb-4">
                    <QRCode value={walletAddress} size={160} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <form
                  id="deposit-form"
                  onSubmit={handleSubmitProof}
                  className="space-y-6"
                >
                  <div className="w-full">
                    <label className="text-sm text-gray-600 block mb-2">
                      Select Payment Method
                    </label>
                    <select
                      value={selectedCoin}
                      onChange={(e) => setSelectedCoin(e.target.value)}
                      className="w-full border rounded-md px-3 py-2"
                    >
                      {Object.keys(WALLET_MAP).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-600 block mb-2">
                      Wallet Address
                    </label>
                    <div className="flex border rounded-md overflow-hidden">
                      <input
                        readOnly
                        value={walletAddress}
                        className="flex-1 px-3 py-2 bg-gray-50 text-sm"
                      />
                      <button
                        onClick={handleCopy}
                        className="px-3 bg-gray-800 text-white text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Amount ({selectedCoin})
                    </label>
                    <div className="flex gap-2">
                      <div className="w-28 flex items-center justify-center border rounded-l-md bg-gray-50 text-sm">
                        {selectedCoin}
                      </div>
                      <input
                        type="number"
                        step="any"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 border rounded-r-md px-4 py-3"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Upload Proof of Deposit
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        id="proof"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setProofFile(e.target.files?.[0] ?? null)
                        }
                        className="flex-1"
                      />
                      <div className="text-sm text-gray-500">
                        {proofFile ? proofFile.name : "No file chosen"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      form="deposit-form"
                      disabled={submitting}
                      className="text-white px-4 py-3 shadow-lg hover:shadow-xl mt-2"
                      style={{ backgroundColor: "#000", borderRadius: "20px" }}
                    >
                      {submitting ? "Submitting..." : "Send Proof of Deposit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
