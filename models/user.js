const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const localPassportPlugin = passportLocalMongoose.default || passportLocalMongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "+91 98765 43210",
    },
    location: {
        type: String,
        default: "Indore, Madhya Pradesh",
    },
    bio: {
        type: String,
        default: "Passionate about exploring new places, meeting new people and experiencing different cultures. Always looking for my next adventure!",
        maxlength: 300,
    },
    avatar: {
        type: String,
        default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    isEmailVerified: {
        type: Boolean,
        default: true,
    },
    accountStatus: {
        type: String,
        default: "Active",
    },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing",
        }
    ],
    savedExperiences: [
        {
            type: Schema.Types.ObjectId,
            ref: "Experience",
        }
    ],
    savedDestinations: [
        {
            type: Schema.Types.ObjectId,
            ref: "Destination",
        }
    ],
    preferences: {
        language: { type: String, default: "English (US)" },
        currency: { type: String, default: "INR (₹)" },
        notifications: { type: Boolean, default: true },
        personalizedRecs: { type: Boolean, default: true },
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.plugin(localPassportPlugin);

module.exports = mongoose.model("User", userSchema);