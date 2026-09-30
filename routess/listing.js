const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");

// Helper Middleware to check authentication for creating/editing stays
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Is feature ke liye pehle login karein!");
        return res.redirect("/login");
    }
    next();
};

// 1. All Stays Index: GET /listings & Create: POST /listings
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, wrapAsync(listingController.createListing));

// 2. New Stay Form: GET /listings/new
router.get("/new", isLoggedIn, listingController.renderNewForm);

// 3. Stay Show, Update & Delete: /listings/:id
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, wrapAsync(listingController.destroyListing));

// 4. Edit Stay Form: GET /listings/:id/edit
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router; 