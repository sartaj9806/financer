import { generateAdminJWTToken } from "../jwt/adminToken.js";

export const adminLogin = async (req, res) => {
    const { adminEmail, adminPassword } = req.body;
    console.log("body data : ", req.body)

    if (!adminEmail || !adminPassword) {
        return res.json({ success: false, message: 'Please Enter use name and Password' })
    }


    if (adminEmail !== process.env.ADMIN_USER || adminPassword !== process.env.ADMIN_PASS) {
        console.log("Not match email and password")
        return res.json({ success: false, message: 'Invalid user and password' })
    }

    const adminToken = generateAdminJWTToken(adminEmail, res);

    
    console.log('successfully login') 

    res.json({ success: true, adminToken })
} 

export const isLogin = async (req, res) => {

    // console.log("Admin is login successfully")
    return res.json({ success: true })

}