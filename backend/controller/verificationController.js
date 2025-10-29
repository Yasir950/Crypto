import handleMysqlError from "../utils/errorHandler.js";
import db from "../db.js";
export const saveVerificationForm = async (req, res) => {
  try {
    const {
      user_id,
      first_name,
      last_name,
      email,
      phone,
      dob,
      address,
      city,
      state,
      nationality,
      type,
    } = req.body;

    // Check if user already submitted verification
    const [existingForm] = await db.query(
      "SELECT * FROM verification WHERE user_id = ?",
      [user_id]
    );

    if (existingForm.length > 0) {
      return res.status(400).json({ message: "Verification form already submitted" });
    }

    // ✅ Construct file URLs
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const image_fs = req.files?.image_fs
      ? `${baseUrl}/assets/verification/${req.files.image_fs[0].filename}`
      : null;
    const image_bs = req.files?.image_bs
      ? `${baseUrl}/assets/verification/${req.files.image_bs[0].filename}`
      : null;

    const insertQuery = `
      INSERT INTO verification (
        user_id,
        first_name,
        last_name,
        email,
        phone,
        dob,
        address,
        city,
        state,
        nationality,
        type,
        image_fs,
        image_bs
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(insertQuery, [
      user_id,
      first_name,
      last_name,
      email,
      phone,
      dob,
      address,
      city,
      state,
      nationality,
      type,
      image_fs,
      image_bs,
    ]);

    res.status(201).json({
      success: true,
      message: "Verification form submitted successfully",
      formId: result.insertId,
      files: { image_fs, image_bs },
    });
  } catch (error) {
    console.error(error);
    handleMysqlError(error, res);
  }
};

