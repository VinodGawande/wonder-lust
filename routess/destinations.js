const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const destinationController = require("../controllers/destinations.js");

// 1. Destinations Landing Page: GET /destinations
router.get("/", wrapAsync(destinationController.index));

// 2. View All Destinations Catalog: GET /destinations/all
router.get("/all", wrapAsync(destinationController.all));

// 3. Search Route: GET /destinations/search
router.get("/search", wrapAsync(destinationController.search));

// 4. Destination Detail Page: GET /destinations/:slug
router.get("/:slug", wrapAsync(destinationController.show));

module.exports = router;