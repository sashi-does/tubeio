import express from 'express'
import {createUser, loginUser, getUsername} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/create-account', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/username', getUsername);

export default userRouter;