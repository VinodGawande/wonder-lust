const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Helper Auth Middleware
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Review add karne ke liye pehle login karein!");
        return res.redirect("/login");
    }
    next();
};

// 1. Post a Review: POST /listings/:id/reviews
router.post(
    "/",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const listing = await Listing.findById(req.params.id);
        const newReview = new Review(req.body.review);
        newReview.author = req.user._id;

        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();

        req.flash("success", "Aapka review submit ho gaya!");
        res.redirect(`/listings/${listing._id}`);
    })
);

// 2. Delete a Review: DELETE /listings/:id/reviews/:reviewId
router.delete(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);

        req.flash("success", "Review delete ho gaya!");
        res.redirect(`/listings/${id}`);
    })
);

module.exports = router; 