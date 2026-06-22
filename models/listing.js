const mongoose = require('mongoose');
const { ref } = require('process');
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {  
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://unsplash.com/photos/modern-apartment-buildings-with-unique-geometric-facades-couTAixLzNM"
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref : "Review",
        }
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reveiws}});
    }

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

