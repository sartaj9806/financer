import jwt from 'jsonwebtoken';

export const adminAuthorized = async (req, res, next) => {
    const adminToken = req.cookies.adminJwt || req.headers.authorization?.split(' ')[1];

    if (!adminToken) {
        return res.json({ success: false, message: 'Not Authorized. Login Again | Token not provided' })
    }

    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET)

        // console.log("decode admin token : ", decoded.adminUser)

        if(decoded.adminUser !== process.env.ADMIN_USER)
        {
            return res.json({success : false , message: 'Not Authorized. Login Again | Admin email not match'})
        }
        
        next();
    } catch (error) {
        return res.json({ success: false, message: 'Not Authorized. Login Again | token verify invalid ' })
    }

}