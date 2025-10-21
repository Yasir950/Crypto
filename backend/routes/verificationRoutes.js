import express from 'express';
import { saveVerificationForm } from '../controller/verificationController.js';
import { upload } from '../middleware/index.js';
const router = express.Router();

router.post('/submit-verification', upload.fields([
    { name: "image_fs", maxCount: 1 },
    { name: "image_bs", maxCount: 1 },
  ]), saveVerificationForm);
export default router;