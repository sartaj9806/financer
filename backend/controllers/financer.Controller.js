import { generateJWTToken } from "../jwt/token.js";
import financerModel from "../models/financer.Model.js"
import bcrypt from 'bcrypt';

export const createFinancer = async (req, res) => {


    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }
        const financerExists = await financerModel.findOne({ email });
        if (financerExists) {
            return res.json({ success: false, message: "Financer already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newFinancer = new financerModel({ name, email, password: hashedPassword });
        const response = await newFinancer.save();
        res.json({ success: true, newFinancer, response, message: 'successfully create financer' });
    } catch (error) {
        console.log(error)

        res.json({ success: false, message: error.message });
    }
}

export const loginFinancer = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const financer = await financerModel.findOne({ email });
        if (!financer) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, financer.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = await generateJWTToken(financer._id, res)

        return res.json({ success: true, token });

    } catch (error) {
        res.json({ succuss: false, message: error.message })
    }
}

export const logoutFinancer = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            path: '/'
        })
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        res.json({ succuss: false, message: error.message })
    }
}

export const getAllFinancer = async (req, res) => {
    console.log("get all financer func")

    try {
        const financer = await financerModel.find();

        if(!financer) {
            return res.json({success : false, message : 'Financer not found'})
        }

        res.json({success : true, financer})

    } catch (error) {
        res.json({success : false, message : error.message})
    }
}

