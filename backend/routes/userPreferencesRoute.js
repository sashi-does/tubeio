import express from 'express';
import {addNiche} from '../controllers/userPreferencesController.js';
import {updateForm,getFormStatus} from '../controllers/formController.js';

const userPreferencesRouter = express.Router();

userPreferencesRouter.post('/add-niche', addNiche);
userPreferencesRouter.patch('/complete-step', updateForm);
userPreferencesRouter.get('/status', getFormStatus);

export default userPreferencesRouter;