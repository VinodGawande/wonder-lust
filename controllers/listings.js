const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");

function normalizeListingImage(listingData) {
    if (typeof listingData.image === "string") {
        listingData.image = {
            filename: "listingimage",
            url: listingData.image || undefined,
        };
    }
    return listingData;
}

// 1. HOME PAGE / LISTINGS INDEX (Filter + Limit Support)
module.exports.index = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    // Agar category choose ki hai (Trending ke alawa)
    if (category && category !== "Trending") {
        filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    // Agar navbar se search kiya hai
    if (search) {
        filter.$or = [
            { title: { $regex: search,$options: "i" } },
            { location: { $regex: search,$options: "i" } },
            { country: { $regex: search,$options: "i" } }
        ];
    }

    // Default me top 6 listings, filter lagne par matching wali
    let query = Listing.find(filter);
    if (!category && !search) {
        query = query.limit(6);
    }

    const allListings = await query;
    res.render("listings/index.ejs", { 
        allListings, 
        activeCategory: category || "Trending",
        isFiltered: Boolean(category || search)
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, activeTab: "stays" });
};

// 2. CREATE LISTING (Crash-Proof: req.body.listing + Optional File Check)
module.exports.createListing = async (req, res, next) => {
    const listingData = req.body.listing;
    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image?.url || "";
    if (originalImageUrl.includes("/upload")) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    }
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
