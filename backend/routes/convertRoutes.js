import express from 'express';
import {convertCrypto, getConvertHistory} from '../controller/convertController.js';
const router = express.Router();
router.post('/convert', convertCrypto);
router.get('/convert/:user_id', getConvertHistory);
export default router;