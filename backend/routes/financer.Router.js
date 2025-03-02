import express from 'express';
import { createFinancer, loginFinancer, logoutFinancer } from '../controllers/financer.Controller.js';

const financerRouter = express.Router();


financerRouter.post('/register', createFinancer)
financerRouter.post('/login', loginFinancer)
financerRouter.get('/logout', logoutFinancer)

export default financerRouter;