import express from 'express'
import {createUser, loginUser} from '../controllers/userController.js';
import updateForm from '../controllers/formController.js';

const userRouter = express.Router();

userRouter.post('/create-account', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/complete-step', updateForm);

export default userRouter;