const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    region: { type: String, default: "" },
    stayCount: { type: String, default: "500+ stays" },
    image: { type: String, required: true },
    heroImage: { type: String, default: "" },
    category: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    description: { type: String, default: "Discover this amazing destination." },
    highlights: [{ type: String }],
    popularAreas: [{ type: String }],
    bestTimeToVisit: { type: String, default: "Year-round" },
    averageStay: { type: String, default: "4 - 7 days" },
    language: { type: String, default: "English & Local" },
    currency: { type: String, default: "Local Currency" },
    thingsToDo: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Destination", destinationSchema);