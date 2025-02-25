import express from 'express';
import {addNiche} from '../controllers/userPreferencesController.js';

const userPreferencesRouter = express.Router();

userPreferencesRouter.post('/add-niche', addNiche);

export default userPreferencesRouter;