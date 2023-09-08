import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        refreshToken: { type: String, default: null }
    },
    { timestamps: true }
);

export default model('User', schema);
