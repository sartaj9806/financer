import mongoose from "mongoose";

const financerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
})

const financerModel = mongoose.model('Financer', financerSchema);

export default financerModel;