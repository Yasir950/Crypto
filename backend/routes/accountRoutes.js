import express from 'express';
import { getAccounts, getAccountsBalance, getAccountsBalanceByUserId, gettransferHistory, transferFunds } from '../controller/accountController.js';
const router = express.Router();
router.get('/accounts', getAccounts);
router.get('/account_balance', getAccountsBalance);
router.get('/account_balance/:user_id', getAccountsBalanceByUserId);
router.post('/transfer', transferFunds);
router.get('/transfer/:user_id', gettransferHistory);
export default router;