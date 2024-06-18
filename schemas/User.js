import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: String
    },
    topic: {
        type: String,
    },
    matesitos: {
        type: Number,
        default: 0
    },
    imgPath: {
        type: String
    },
    banner: {
        type: String
    },
    mercadopagoAccessToken: { type: String, default: null },

}, { timestamps: true })

export default mongoose.model('User', userSchema)