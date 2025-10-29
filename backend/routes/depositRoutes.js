import express from 'express';
import { upload } from '../middleware/depositMulter.js';
import { getDepositByUserId, saveDeposit } from '../controller/depositController.js';
const router = express.Router();

router.get('/deposit/:user_id', getDepositByUserId)
router.post('/deposit', upload.fields([
    { name: "proof_image", maxCount: 1 }
  ]), saveDeposit);
export default router;