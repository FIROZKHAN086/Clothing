import express from 'express';
import { loginUser, registerUser, user } from '../Controllers/UserCon.js';

const userRouter = express.Router();

userRouter.post('/loginUser', loginUser);
userRouter.post('/registerUser', registerUser);
userRouter.get('/getAllUsers', user);

export default userRouter;

