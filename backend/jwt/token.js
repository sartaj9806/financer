import jwt from 'jsonwebtoken';

export const generateJWTToken = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    })

    return token;

}
