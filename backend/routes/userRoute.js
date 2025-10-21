import express from "express";
import { getUsers, saveUsers, updateUser } from "../controller/userController.js";
const router= express.Router();

router.get('/users', getUsers);
router.post('/users', saveUsers);
router.put('/users/:user_id', updateUser);

export default router;