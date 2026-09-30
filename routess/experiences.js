const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const experienceController = require("../controllers/experiences.js");

// 1. Experiences Landing & Filter: GET /experiences
router.get("/", wrapAsync(experienceController.index));

// 2. Experience Search: GET /experiences/search
router.get("/search", wrapAsync(experienceController.search));

// 3. Experience Detail Page: GET /experiences/:id
router.get("/:id", wrapAsync(experienceController.show));

// 4. Submit Review & Rating: POST /experiences/:id/reviews
router.post("/:id/reviews", wrapAsync(experienceController.addReview));

// 5. Checkout & UPI Payment Screen: GET /experiences/:id/checkout
router.get("/:id/checkout", wrapAsync(experienceController.checkout));

// 6. Confirm Booking: POST /experiences/:id/book
router.post("/:id/book", wrapAsync(experienceController.book));

// 7. Host an Experience Landing Page: GET /experiences/host
router.get("/host", (req, res) => {
    res.render("experiences/host.ejs", { activeTab: "host" });
});

module.exports = router;