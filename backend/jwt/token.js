import jwt from 'jsonwebtoken';

export const generateJWTToken = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        path: '/'
    })

    return token;

}
