const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

//index route
router.get("/", wrapAsync(listingController.index));


//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show route
router.get("/:id", wrapAsync(listingController.showListing));

//create route
router.post("/",
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

//Update route
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing));

//Delete route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing));



module.exports = router;