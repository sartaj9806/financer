import express from 'express';
import { createFinancer, getAllFinancer, loginFinancer, logoutFinancer } from '../controllers/financer.Controller.js';
import { adminAuthorized } from '../middleware/adminAuthorized.js';
const financerRouter = express.Router();

// This routes is being used by financer that's why here we don't need to protect;
financerRouter.post('/login', loginFinancer)
financerRouter.get('/logout', logoutFinancer)


//This Routes is being used by adming that's why we need to protect route for access unauthorized
financerRouter.post('/register', adminAuthorized, createFinancer)
financerRouter.get('/get-all-financer', adminAuthorized, getAllFinancer )

export default financerRouter;