import express from 'express';
import {getWithdrawHistory, withdrawAmount} from '../controller/withdrawController.js'
const router = express.Router();

router.get('/withdraw/:user_id', getWithdrawHistory)
router.post('/withdraw', withdrawAmount)

export default router;