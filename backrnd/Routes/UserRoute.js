import express from 'express';
import { loginUser, registerUser, listUsers, deleteUser } from '../Controllers/UserCon.js';

const userRouter = express.Router();

userRouter.post('/loginUser', loginUser);
userRouter.post('/registerUser', registerUser);
userRouter.get('/getAllUsers', listUsers);
userRouter.delete('/deleteUser/:id', deleteUser);
export default userRouter;

