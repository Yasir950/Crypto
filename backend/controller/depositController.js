import handleMysqlError from "../utils/errorHandler.js";
import db from '../db.js'

export const getDepositByUserId = async (req, res) => {
     try {
   const {user_id} = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const [deposits] = await db.query(
      "SELECT * FROM deposit WHERE user_id = ? ORDER BY id DESC",
      [user_id]
    );


    // ✅ Return deposits
    res.status(200).json({
      success: true,
      count: deposits.length,
      deposits,
    });
   } catch (error) {
    handleMysqlError(error, res);
   } 
}
export const saveDeposit = async (req, res) => {
  try {
    const { user_id, payment_method, amount, hashcode, deposit_source, referral_id, status } = req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const proof_image = req.files?.proof_image
      ? `${baseUrl}/assets/deposit/${req.files.proof_image[0].filename}`
      : null;

    // 1️⃣ Insert into deposit table
    const insertDepositQuery = `
      INSERT INTO deposit (
        user_id,
        payment_method,
        amount,
        hashcode,
        proof_image,
        deposit_source,
        referral_id,
        status
      )
      VALUES (?, ?, ?, ?, ?, 'Manual', NULL, 'Pending')
    `;

    const [depositResult] = await db.query(insertDepositQuery, [
      user_id,
      payment_method,
      amount,
      hashcode,
      proof_image,
      deposit_source,
      referral_id,
      status,
    ]);

    // 2️⃣ Check if user has an account

    // 3️⃣ Check if balance already exists for this coin
    const [existingBalance] = await db.query(
      "SELECT * FROM account_balance WHERE user_id = ? AND account_id = ? AND coin = ?",
      [user_id, 3, payment_method]
    );

    if (existingBalance.length > 0) {
      // Update balance if exists
      await db.query(
        "UPDATE account_balance SET balance = balance + ?  WHERE id = ?",
        [amount, existingBalance[0].id]
      );
    } else {
      // Insert new record if not exists
      await db.query(
        "INSERT INTO account_balance (user_id, account_id, coin, balance) VALUES (?, ?, ?, ?)",
        [user_id, 3, payment_method, amount]
      );
    }

    res.status(201).json({
      success: true,
      message: "Deposit and account balance saved successfully",
      depositId: depositResult.insertId    });
  } catch (error) {
    handleMysqlError(error, res);
  }
};
