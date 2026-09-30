const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Handle both CommonJS & ES Module default exports safely
const plm = require("passport-local-mongoose");
const passportLocalMongoose = plm.default || plm;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: ""
    },
    lastName: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // Login audit tracking
    lastLogin: {
        type: Date,
        default: null
    },
    loginCount: {
        type: Number,
        default: 0
    },
    lastLoginIp: {
        type: String,
        default: null
    },
    // Forgot Password & Reset Tracking
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    lastPasswordReset: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Plugin seamlessly attach ho jayega
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema); 