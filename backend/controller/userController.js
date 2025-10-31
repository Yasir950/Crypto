import db from "../db.js"
import handleMysqlError from "../utils/errorHandler.js";
import brevo from "@getbrevo/brevo"
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const getUsers = async(req, res) => {
   try {
    const [users] = await db.query('SELECT * FROM users');
    res.status(200).json(users);
   } catch (error) {
    handleMysqlError(error, res);
   } 
}
 const saveUsers = async (req, res) => {
  try {
    const { username, fullname, country, currency, phone, email, password, timezone } = req.body;

    // 1️⃣ Check if user already exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Insert new user (status = 0 = unverified)
    const insertQuery = `
      INSERT INTO users (username, fullname, country, currency, phone, email, password, timezone, role, referral_id, referred_by, reset_token, reset_expiry, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, '', NULL, NULL, NULL, NULL, 0)
    `;
    const [result] = await db.query(insertQuery, [
      username,
      fullname,
      country,
      currency,
      phone,
      email,
      password,
      timezone,
    ]);

    // 3️⃣ Send verification email
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Verification link using email only
    const verifyUrl = `http://localhost:8080/api/verify-email?email=${encodeURIComponent(email)}`;

    const sendSmtpEmail = {
      to: [{ email, name: fullname }],
      sender: { email: "368yasir@gmail.com", name: "Crypto" },
      subject: "✅ Confirm Your Email - Crypto Platform",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Hello, ${fullname}!</h2>
          <p>Thanks for signing up on <strong>Crypto Platform</strong>.</p>
          <p>Please confirm your email by clicking the button below:</p>
          <p>
            <a href="${verifyUrl}" style="background:#007bff;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Confirm Email</a>
          </p>
          <p style="font-size:12px;color:#777;">If you didn’t create this account, please ignore this email.</p>
        </div>
      `,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.status(201).json({
      success: true,
      message: "User registered successfully! Verification email sent.",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ message: "Error saving user or sending email", error: error.message });
  }
};



const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, fullname, currency, phone, country, timezone } = req.body;
    // ✅ Check if user exists
    const userExistsQuery = "SELECT * FROM users WHERE id = ?";
    const [existingUser] = await db.query(userExistsQuery, [user_id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Prepare dynamic fields
    const fields = [];
    const values = [];

    if (username !== undefined) {
      fields.push("username = ?");
      values.push(username);
    }
    if (fullname !== undefined) {
      fields.push("fullname = ?");
      values.push(fullname);
    }
    if (currency !== undefined) {
      fields.push("currency = ?");
      values.push(currency);
    }
    if (phone !== undefined) {
      fields.push("phone = ?");
      values.push(phone);
    }
     if (country !== undefined) {
      fields.push("country = ?");
      values.push(country);
    }
     if (timezone !== undefined) {
      fields.push("timezone = ?");
      values.push(timezone);
    }

    // ✅ If no fields to update
    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // ✅ Add user_id for WHERE clause
    values.push(user_id);

    // ✅ Build query dynamically
    const updateQuery = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    await db.query(updateQuery, values);

    // ✅ Fetch and return updated record
    const [updatedUser] = await db.query("SELECT * FROM users WHERE id = ?", [user_id]);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser[0],
    });
  } catch (error) {
    handleMysqlError(error, res);
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).send("Invalid verification link.");

    // 1️⃣ Check if user exists
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) return res.status(404).send("User not found.");

    // 2️⃣ If already verified
    if (user[0].status === 1) {
      return res.status(200).send(`
        <h2>Email already verified ✅</h2>
        <p>You can now <a href="http://localhost:3000/signin">login</a>.</p>
      `);
    }

    // 3️⃣ Update status to verified
    await db.query("UPDATE users SET status = 1 WHERE email = ?", [email]);

    // 4️⃣ Success message
    res.status(200).send(`
      <h2>Email verified successfully 🎉</h2>
      <p>You can now <a href="http://localhost:3000/signin">login</a> to your account.</p>
    `);
  } catch (error) {
    console.error("❌ Email verification error:", error);
    res.status(500).send("Server error while verifying email.");
  }
};


export {getUsers, saveUsers, updateUser}