const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String },
    category: {
        type: String,
        enum: [
            "Trending",
            "Food & Dining",
            "Water Activities",
            "Adventure",
            "Arts & Culture",
            "Wellness",
            "Nightlife",
            "Tours",
            "Photography",
            "Classes"
        ],
        default: "Trending"
    },
    badge: { type: String, default: "Guest Favorite" }, // e.g., "Guest Favorite", "Best Seller", "New"
    badgeColor: { type: String, default: "bg-slate-900/80" },
    location: { type: String, required: true },
    country: { type: String, required: true },
    duration: { type: String, default: "3 hours" },
    maxGuests: { type: Number, default: 8 },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.9 },
    reviewCount: { type: Number, default: 120 },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    description: { type: String, required: true },
    language: { type: String, default: "English, Hindi" },
    itinerary: [
        {
            time: { type: String },
            title: { type: String },
            description: { type: String }
        }
    ],
    included: [{ type: String }],
    meetingPoint: {
        address: { type: String },
        landmark: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Experience", experienceSchema);