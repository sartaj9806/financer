import express from 'express';
import { adminLogin, isLogin } from '../controllers/admin.Controller.js';
import { adminAuthorized } from '../middleware/adminAuthorized.js';


const router = express.Router();

router.post('/login', adminLogin);
router.get('/is-Login', adminAuthorized, isLogin);

export default router; 