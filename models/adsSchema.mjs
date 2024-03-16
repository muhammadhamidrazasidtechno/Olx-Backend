import mongoose from "mongoose";

const { Schema } = mongoose;

const adsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true,
    },
    location: {
        type: Object,
        required: true
    },
    userId: {
        type: String, // Change type to String for userId
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Ad = mongoose.model("Ads", adsSchema);

export default Ad;
