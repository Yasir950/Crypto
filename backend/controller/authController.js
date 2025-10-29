import handleMysqlError from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import db from "../db.js";
import bcrypt from 'bcrypt';

const createToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1d'});
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email
    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    // 2️⃣ Check if account is verified
    if (user.status !== 1) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
    }

    // 3️⃣ Validate password (uncomment when using bcrypt)
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 4️⃣ Generate token
    const token = createToken(user);

    // 5️⃣ Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    handleMysqlError(error, res);
  }
};

export {login}