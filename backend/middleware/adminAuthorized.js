import jwt from 'jsonwebtoken';

export const adminAuthorized = async (req, res, next) => {
    const adminToken = req.cookies.adminJwt || req.headers.authorization?.split(' ')[1];

    if (!adminToken) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' })
    }

    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET)

        
        if (decoded.adminPass !== process.env.ADMIN_USER + process.env.ADMIN_PASS) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' })
        }

        next();

    } catch (error) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' })
    }

}