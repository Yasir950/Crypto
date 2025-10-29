import handleMysqlError from "../utils/errorHandler.js";
import db from '../db.js';
export const getAccounts = async (req, res) => {
    try {
       const [accounts] = await db.query('SELECT * FROM accounts');
       res.status(201).json({
        success: true,
        accounts
       })
    } catch (error) {
        handleMysqlError(error, res)
    }
}
export const getAccountsBalance = async (req, res) => {
    try {
       const [account_balance] = await db.query('SELECT * FROM account_balance');
       res.status(201).json({
        success: true,
        account_balance
       })
    } catch (error) {
        handleMysqlError(error, res)
    }
}
export const getAccountsBalanceByUserId = async (req, res) => {
    try {
      const {user_id} = req.params;
       const [accounts] = await db.query('SELECT * FROM account_balance WHERE user_id = ?', [user_id]);
       res.status(201).json({
        success: true,
        accounts
       })
    } catch (error) {
        handleMysqlError(error, res)
    }
}
export const transferFunds = async (req, res) => {
  try {
    const { user_id, fromAccountId, toAccountId, coin, amount } = req.body;

    if (!user_id || !fromAccountId || !toAccountId || !coin || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (fromAccountId === toAccountId) {
      return res.status(400).json({ message: "Cannot transfer to the same account" });
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return res.status(400).json({ message: "Invalid transfer amount" });
    }

    // ✅ Fetch sender balance (must exist for this user + account)
    const [fromRows] = await db.query(
      "SELECT * FROM account_balance WHERE user_id = ? AND account_id = ? AND coin = ?",
      [user_id, fromAccountId, coin]
    );

    if (fromRows.length === 0) {
      return res.status(400).json({ message: "Sender account not found for this user" });
    }

    const fromBalance = parseFloat(fromRows[0].balance);

    if (fromBalance < transferAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // ✅ Deduct from sender
    const newFromBalance = fromBalance - transferAmount;
    await db.query(
      "UPDATE account_balance SET balance = ? WHERE user_id = ? AND account_id = ? AND coin = ?",
      [newFromBalance, user_id, fromAccountId, coin]
    );

    // ✅ Check if receiver entry exists for SAME USER
    const [toRowsForUser] = await db.query(
      "SELECT * FROM account_balance WHERE user_id = ? AND account_id = ? AND coin = ?",
      [user_id, toAccountId, coin]
    );

    if (toRowsForUser.length > 0) {
      // ✅ User already has this account + coin entry → just update
      const newToBalance = parseFloat(toRowsForUser[0].balance) + transferAmount;
      await db.query(
        "UPDATE account_balance SET balance = ? WHERE user_id = ? AND account_id = ? AND coin = ?",
        [newToBalance, user_id, toAccountId, coin]
      );
    } else {
      // ✅ No entry → create a new one for this user
      await db.query(
        "INSERT INTO account_balance (user_id, account_id, coin, balance) VALUES (?, ?, ?, ?)",
        [user_id, toAccountId, coin, transferAmount]
      );
    }
// ✅ Optionally, record transfer in history
 await db.query("INSERT INTO transfer_history (user_id, from_account, to_account, coin, amount, status) VALUES (?, ?, ?, ?, ?, ?)", 
 [user_id, fromAccountId, toAccountId, coin, transferAmount, "completed"] 
 );
    // ✅ Return updated balances
    res.status(200).json({
      success: true,
      message: "Transfer successful",
      data: {
        fromAccountId,
        toAccountId,
        coin,
        amount: transferAmount,
        newFromBalance,
      },
    });
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const gettransferHistory = async (req, res) => {
    try {
      const {user_id} = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const [history] = await db.query(
      "SELECT * FROM transfer_history WHERE user_id = ? ORDER BY id DESC",
      [user_id]
    );
       res.status(201).json({
        success: true,
        history
       })
    } catch (error) {
        handleMysqlError(error, res)
    }
}

