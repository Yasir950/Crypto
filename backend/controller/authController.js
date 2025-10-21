import handleMysqlError from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import db from "../db.js";
import bcrypt from 'bcrypt';

const createToken = (user) => {
    return jwt.sign({id: user.user_id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1d'});
}
const login =async (req, res) => {

    try {
       const { email, password } = req.body;
    const [results] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (results.length === 0)
      return res.status(400).json({ message: 'User not found' });
    const user = results[0];
    // ✅ Use bcrypt for password validation
    const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});
    const token = createToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user,
    });
    } catch (error) {
        handleMysqlError(error, res);
    }
}
export {login}