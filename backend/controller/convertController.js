import db from "../db.js";

export const convertCrypto = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const {
      user_id,
      from_account_id,
      from_coin,
      to_account_id,
      to_coin,
      amount,
      converted_amount,
    } = req.body;

    // 🧩 Validate input
    if (
      !user_id ||
      !from_account_id ||
      !from_coin ||
      !to_account_id ||
      !to_coin ||
      !amount ||
      !converted_amount
    ) {
      connection.release();
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fromAmount = parseFloat(amount);
    const toAmount = parseFloat(converted_amount);

    if (isNaN(fromAmount) || fromAmount <= 0 || isNaN(toAmount) || toAmount <= 0) {
      connection.release();
      return res
        .status(400)
        .json({ success: false, message: "Invalid conversion values" });
    }

    await connection.beginTransaction();

    // 🔍 Fetch source balance
    const [fromRows] = await connection.query(
      "SELECT * FROM account_balance WHERE user_id = ? AND account_id = ? AND coin = ? FOR UPDATE",
      [user_id, from_account_id, from_coin]
    );

    if (fromRows.length === 0) {
      await connection.rollback();
      connection.release();
      return res
        .status(404)
        .json({ success: false, message: "Source account not found" });
    }

    const fromBalance = parseFloat(fromRows[0].balance);
    if (fromBalance < fromAmount) {
      await connection.rollback();
      connection.release();
      return res
        .status(400)
        .json({ success: false, message: "Insufficient balance" });
    }

    // 💰 Deduct from source account
    const newFromBalance = fromBalance - fromAmount;
    await connection.query(
      "UPDATE account_balance SET balance = ?, updated_at = NOW() WHERE id = ?",
      [newFromBalance, fromRows[0].id]
    );

    // 🔍 Update or insert destination account
    const [toRows] = await connection.query(
      "SELECT * FROM account_balance WHERE user_id = ? AND account_id = ? AND coin = ? FOR UPDATE",
      [user_id, to_account_id, to_coin]
    );

    if (toRows.length > 0) {
      const toBalance = parseFloat(toRows[0].balance);
      const newToBalance = toBalance + toAmount;

      await connection.query(
        "UPDATE account_balance SET balance = ?, updated_at = NOW() WHERE id = ?",
        [newToBalance, toRows[0].id]
      );
    } else {
      await connection.query(
        "INSERT INTO account_balance (user_id, account_id, coin, balance) VALUES (?, ?, ?, ?)",
        [user_id, to_account_id, to_coin, toAmount]
      );
    }

    // 🧾 Record conversion history
    await connection.query(
      `INSERT INTO convert_history 
       (user_id, from_account_id, from_coin, to_account_id, to_coin, from_amount, to_amount)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        from_account_id,
        from_coin,
        to_account_id,
        to_coin,
        fromAmount,
        toAmount,
      ]
    );

    await connection.commit();
    connection.release();

    res.status(200).json({
      success: true,
      message: "Conversion saved successfully",
      data: { from_account_id, to_account_id, from_coin, to_coin, amount, converted_amount },
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Conversion error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const getConvertHistory = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const [history] = await db.query(
      "SELECT * FROM convert_history WHERE user_id = ? ORDER BY id DESC",
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