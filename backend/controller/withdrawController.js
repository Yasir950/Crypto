import handleMysqlError from "../utils/errorHandler.js";
import db from '../db.js';

// --- Withdraw crypto from selected user account ---
export const withdrawAmount = async (req, res) => {
  try {
    const { user_id, account_id, coin, amount, address } = req.body;

    // 🧩 Validate input
    if (!user_id || !account_id || !coin || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid withdrawal amount" });
    }

    // 🔍 Check user balance for this coin & account
    const [rows] = await db.query(
      "SELECT * FROM account_balance WHERE user_id = ? AND account_id = ? AND coin = ?",
      [user_id, account_id, coin]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Account or balance not found" });
    }

    const currentBalance = parseFloat(rows[0].balance);
    if (currentBalance < withdrawAmount) {
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    // 💰 Deduct from balance
    const newBalance = currentBalance - withdrawAmount;
    await db.query(
      "UPDATE account_balance SET balance = ? WHERE user_id = ? AND account_id = ? AND coin = ?",
      [newBalance, user_id, account_id, coin]
    );

    // 🧾 Record withdrawal in history
    await db.query(
      "INSERT INTO withdraw (user_id, account_id, coin, amount, address, status) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, account_id, coin, withdrawAmount, address, "Sent"]
    );

    // ✅ Respond success
    res.status(200).json({
      success: true,
      message: "Withdrawal successful",
      newBalance,
    });
  } catch (error) {
    console.error("Withdraw error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// --- Get withdraw history by user_id ---
export const getWithdrawHistory = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const [history] = await db.query(
      "SELECT * FROM withdraw WHERE user_id = ? ORDER BY id DESC",
      [user_id]
    );

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
   handleMysqlError(error, res)
  }
};
