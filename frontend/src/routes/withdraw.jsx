import React, { useEffect, useState } from "react";
import { getData, getDataById, saveData } from "../apiservice";
import { toast } from "react-toastify";

function WithDrawComp() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [accounts, setAccounts] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAccountsData();
    getAccountsDataByUser();
    getWithdrawHistory();
  }, []);

  const getAccountsData = async () => {
    let res = await getData("accounts");
    if (res.success) setAccounts(res.accounts);
  };
  const getAccountsDataByUser = async () => {
    let res = await getDataById("account_balance", user.id);
    if (res.success) setUserAccounts(res.accounts);
  };
  const getWithdrawHistory = async () => {
    let res = await getDataById("withdraw", user.id);
    if (res.success) setTransactions(res.history);
  };

  const handleCryptoChange = (crypto) => {
    setSelectedCrypto(crypto);
    const selectedAccountData = userAccounts.find(
      (acc) => acc.coin === crypto && acc.account_id == selectedAccount
    );
    if (crypto && step === 2) nextStep();
    setBalance(selectedAccountData?.balance || 0);
  };

  const handleWithdraw = async () => {
    if (
      !selectedCrypto ||
      !walletAddress ||
      !withdrawAmount ||
      !selectedAccount
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    const res = await saveData(
      {
        user_id: user.id,
        coin: selectedCrypto,
        address: walletAddress,
        amount: withdrawAmount,
        account_id: Number(selectedAccount),
      },
      "withdraw"
    );
    setLoading(false);

    if (res.success) {
      toast.success("Withdrawal requested successfully!");
      setWithdrawAmount("");
      setWalletAddress("");
      setSelectedAccount("");
      setSelectedCrypto("");
      setStep(1);
      getAccountsData();
      getAccountsDataByUser();
      getWithdrawHistory();
    } else {
      toast.error(res.message || "Withdrawal failed. Try again.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Withdraw Crypto
        </h2>

        {/* Stepper */}
        <div className="flex">
          {/* Left side - steps */}
          <div className="relative flex flex-col items-center mr-8">
            {[1, 2, 3, 4].map((n, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold ${
                    step === n
                      ? "bg-black text-white"
                      : step > n
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {n}
                </div>
                {n !== 4 && (
                  <div
                    className={`w-px h-12 ${
                      step > n ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Right side - form fields */}
          <div className="flex-1 space-y-1">
            {/* Step 1 */}
            <div>
              <h3 className="font-medium text-gray-800 ">
                1. Select Account Type
              </h3>
              <select
                className="w-96 border bg-[#E5E5E5]  rounded-lg py-1 px-3 focus:ring-2 focus:ring-blue-500"
                value={selectedAccount}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedAccount(value);
                  if (value && step === 1) nextStep();
                }}
              >
                <option value="">Select Account</option>
                {accounts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.account_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2 */}
            {selectedAccount && (
              <div>
                <h3 className="font-medium text-gray-800">2. Select Crypto</h3>
                <select
                  className="w-96 border bg-[#E5E5E5]  rounded-lg py-1 px-3 focus:ring-2 focus:ring-blue-500"
                  value={selectedCrypto}
                  onChange={(e) => handleCryptoChange(e.target.value)}
                >
                  <option value="">Select Crypto</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="USDT">USDT (USDT)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                </select>
                {selectedCrypto && (
                  <p className="text-sm text-gray-500 mt-1">
                    Available Balance:{" "}
                    <span className="font-semibold text-gray-800">
                      {balance}
                    </span>
                  </p>
                )}
                {/* <div className="mt-4 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 rounded-md border border-gray-400"
                  >
                    Back
                  </button>
                  <button
                    disabled={!selectedCrypto}
                    onClick={nextStep}
                    className="px-6 py-2 rounded-md bg-black text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div> */}
              </div>
            )}

            {/* Step 3 */}
            {selectedCrypto && (
              <div>
                <h3 className="font-medium text-gray-800 ">
                  3. Enter Wallet Address
                </h3>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-96 border bg-[#E5E5E5]  rounded-lg py-1 px-3 focus:ring-2 focus:ring-blue-500"
                />
                {/* <div className="mt-4 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 rounded-md border border-gray-400"
                  >
                    Back
                  </button>
                  <button
                    disabled={!walletAddress}
                    onClick={nextStep}
                    className="px-6 py-2 rounded-md bg-black text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div> */}
              </div>
            )}

            {/* Step 4 */}
            {walletAddress && (
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  4. Enter Withdrawal Amount
                </h3>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-96 border bg-[#E5E5E5]  rounded-lg py-1 px-3 focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-4 flex gap-3">
                  <button
                    disabled={loading}
                    onClick={handleWithdraw}
                    className="px-6 py-2 rounded-md bg-black text-white disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Withdraw"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Withdrawal History
          </h3>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Coin</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(t.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{t.coin}</td>
                    <td className="py-3 px-4">{t.amount}</td>
                    <td className="py-3 px-4 truncate max-w-[200px]">
                      {t.address}
                    </td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        t.status === "Sent"
                          ? "text-green-600"
                          : t.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {t.status}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td className="text-center py-4 text-gray-400" colSpan={5}>
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithDrawComp;
