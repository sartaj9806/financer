import jwt from 'jsonwebtoken';



export const generateAdminJWTToken = async (adminPass, res) => {
    const adminToken = jwt.sign({ adminPass }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    console.log("Admin generate Token : ", adminPass)

    res.cookie("adminJwt", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        path: '/'
    })

    return adminToken;

}
