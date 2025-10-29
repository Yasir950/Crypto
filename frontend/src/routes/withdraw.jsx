import React, { useEffect, useState } from "react";
import { getData, getDataById, saveData } from "../apiservice"; // assuming you have postData
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
  const [message, setMessage] = useState("");
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
      (acc) => acc.coin == crypto && acc.account_id == selectedAccount
    );
    setBalance(selectedAccountData?.balance || 0);
  };

  const handleWithdraw = async () => {
    if (!selectedCrypto || !walletAddress || !withdrawAmount) {
      setMessage("Please fill all fields.");
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
    console.log(res);
    if (res.success) {
      toast.success("Withdrawal requested successfully!");
      setWithdrawAmount("");
      setWalletAddress("");
      getWithdrawHistory();
    } else {
      toast.error(res.message || "Withdrawal failed. Try again.");
    }
  };
  const changeAccountType = (e) => {
    let { value } = e.target;
    setSelectedAccount(value);
    if (selectedCrypto) {
      const selectedAccountData = userAccounts.find(
        (acc) => acc.coin == selectedCrypto && acc.account_id == value
      );
      setBalance(selectedAccountData?.balance || 0);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-12">
      <div className="max-w-5xl mx-auto  p-6 sm:p-10">
        {/* Header Info */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-8">
          <div>
            <p className="font-semibold text-gray-800">{user.fullname}</p>
            <p>{user.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Email</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Verification</p>
            <p className="text-green-600 font-medium">Verified</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Country</p>
            <p>{user.country}</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Withdraw Crypto
        </h2>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Account Type
            </label>
            <select
              className="w-full border rounded-md py-3 px-3 focus:ring-2 focus:ring-blue-500"
              value={selectedAccount}
              onChange={(e) => changeAccountType(e)}
            >
              <option value="">Select Account</option>
              {accounts.map((item) => (
                <option value={item.id}>{item.account_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Coin
            </label>
            <select
              className="w-full border rounded-md py-3 px-3 focus:ring-2 focus:ring-blue-500"
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
                <span className="font-semibold text-gray-800">{balance}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Destination Address
            </label>
            <input
              type="text"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full border rounded-md py-3 px-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Withdrawal Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full border rounded-md py-3 px-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.includes("success") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <button
            disabled={loading}
            onClick={handleWithdraw}
            className="w-full bg-black hover:bg-black-700 text-white py-2 rounded-lg  transition"
          >
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </div>

        {/* Transaction Table */}
        <div className="mt-10">
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
