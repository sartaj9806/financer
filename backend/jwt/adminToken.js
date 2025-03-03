import jwt from 'jsonwebtoken';



export const generateAdminJWTToken = async (adminUser, res) => {
    const adminToken = jwt.sign({ adminUser }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    res.cookie("adminJwt", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        path: '/'
    })

    return adminToken;

}
