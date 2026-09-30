const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftCardSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 500
    },
    balance: {
        type: Number,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    senderName: {
        type: String,
        default: "Anonymous"
    },
    recipientName: {
        type: String,
        required: true
    },
    recipientEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    message: {
        type: String,
        default: "Enjoy your unforgettable journey with WonderLust!"
    },
    occasion: {
        type: String,
        default: "General"
    },
    status: {
        type: String,
        enum: ["active", "redeemed", "expired"],
        default: "active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("GiftCard", giftCardSchema);