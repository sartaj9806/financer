import jwt from 'jsonwebtoken';
import Financer from '../models/financer.Model.js';

export const authorized = async (req, res, next) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.userId) {
            const financer = await Financer.findById(decoded.userId);
            req.financer = financer;
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' })
        }
        next();

    } catch (error) {
        return res.json({ success: false, message: 'Not Authorized. Login Again'})
    }

}