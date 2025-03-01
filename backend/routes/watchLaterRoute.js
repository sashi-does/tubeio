import express from 'express';
import {addToWatchLater, removeFromWatchLater, clearWatchLater, showAllWatchLater} from '../controllers/watchLaterController.js';

const watchLaterRouter = express.Router();

watchLaterRouter.put('/add', addToWatchLater);
watchLaterRouter.get('/all', showAllWatchLater);

export default watchLaterRouter;

