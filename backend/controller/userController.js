import db from "../db.js"
import handleMysqlError from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

const getUsers = async(req, res) => {
   try {
    const [users] = await db.query('SELECT * FROM user');
    res.status(200).json(users);
   } catch (error) {
    handleMysqlError(error, res);
   } 
}

const saveUsers = async(req, res) => {
   try {
      const {user_id, user_name, full_name, country, currency, phone, email, password, } = req.body;
       const [existingUser] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const insertQuery = `
      INSERT INTO user (user_name, full_name, country, currency, phone, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(insertQuery, [
      user_name,
      full_name,
      country,
      currency,
      phone,
      email,
      hashedPassword,
    ]);

    // 4️⃣ Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertId,
    }); 
   } catch (error) {
      handleMysqlError(error, res);
   }
}

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_name, full_name, currency, phone } = req.body;
    // ✅ Check if user exists
    const userExistsQuery = "SELECT * FROM user WHERE user_id = ?";
    const [existingUser] = await db.query(userExistsQuery, [user_id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Prepare dynamic fields
    const fields = [];
    const values = [];

    if (user_name !== undefined) {
      fields.push("user_name = ?");
      values.push(user_name);
    }
    if (full_name !== undefined) {
      fields.push("full_name = ?");
      values.push(full_name);
    }
    if (currency !== undefined) {
      fields.push("currency = ?");
      values.push(currency);
    }
    if (phone !== undefined) {
      fields.push("phone = ?");
      values.push(phone);
    }

    // ✅ If no fields to update
    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // ✅ Add user_id for WHERE clause
    values.push(user_id);

    // ✅ Build query dynamically
    const updateQuery = `UPDATE user SET ${fields.join(", ")} WHERE user_id = ?`;
    await db.query(updateQuery, values);

    // ✅ Fetch and return updated record
    const [updatedUser] = await db.query("SELECT * FROM user WHERE user_id = ?", [user_id]);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser[0],
    });
  } catch (error) {
    handleMysqlError(error, res);
  }
};

export {getUsers, saveUsers, updateUser}