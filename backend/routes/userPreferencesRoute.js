import express from 'express';
import {addNiche, getNiches} from '../controllers/userPreferencesController.js';
import {updateForm,getFormStatus} from '../controllers/formController.js';

const userPreferencesRouter = express.Router();

userPreferencesRouter.post('/add-niche', addNiche);
userPreferencesRouter.patch('/complete-step', updateForm);
userPreferencesRouter.get('/status', getFormStatus);
userPreferencesRouter.get('/get-niches', getNiches);

export default userPreferencesRouter;