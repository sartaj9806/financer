import { generateAdminJWTToken } from "../jwt/adminToken.js";

export const adminLogin = async (req, res) => {
    const { adminEmail, adminPassword } = req.body;

    if (!adminEmail || !adminPassword) {
        return res.json({ success: false, message: 'Please Enter use name and Password' })
    }


    if (adminEmail !== process.env.ADMIN_USER || adminPassword !== process.env.ADMIN_PASS) {
        return res.json({ success: false, message: 'Invalid user and password' })
    }

    const adminPass = adminEmail + adminPassword;

    const adminToken = generateAdminJWTToken(adminPass, res);

    
     res.json({ success: true, message : 'Admin Login Successfully', adminToken })
} 

export const isLogin = async (req, res) => {

    return res.json({ success: true})

}