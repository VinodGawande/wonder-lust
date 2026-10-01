const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Booking = require("../models/booking");
const Review = require("../models/review");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware");
const { storage } = require("../cloudConfig");

const avatarUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        callback(allowedTypes.includes(file.mimetype) ? null : new Error("Upload a JPG, PNG, or WEBP image."), allowedTypes.includes(file.mimetype));
    },
});

const handleAvatarUpload = (req, res, next) => {
    avatarUpload.single("avatar")(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        next();
    });
};

router.get("/profile", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.render("profile/index.ejs", {
            user,
            activeTab: "profile",
            activeAccountTab: "profile",
        });
    } catch (err) {
        console.error("Profile page error:", err);
        req.flash("error", "Unable to load profile.");
        res.redirect("/");
    }
});

router.get("/saved", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("wishlist")
            .populate("savedExperiences")
            .populate("savedDestinations");

        res.render("saved/index.ejs", {
            user,
            stays: user.wishlist || [],
            experiences: user.savedExperiences || [],
            destinations: user.savedDestinations || [],
            activeTab: "saved",
            activeAccountTab: "saved",
        });
    } catch (err) {
        console.error("Saved page error:", err);
        req.flash("error", "Unable to load saved collection.");
        res.redirect("/");
    }
});

router.patch("/api/profile", isLoggedIn, async (req, res) => {
    try {
        const { fullName, phone, location, bio } = req.body;
        const nameParts = String(fullName || "").trim().split(/\s+/);
        if (!nameParts[0]) {
            return res.status(400).json({ success: false, message: "Full name is required." });
        }

        const phoneValue = String(phone || "").trim();
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(" "),
            phone: phoneValue && !phoneValue.startsWith("+") ? `+91 ${phoneValue}` : phoneValue,
            location: String(location || "").trim(),
            bio: String(bio || "").trim(),
        }, { new: true, runValidators: true });

        return res.json({ success: true, message: "Profile updated successfully.", user: updatedUser });
    } catch (err) {
        console.error("Profile update error:", err);
        return res.status(500).json({ success: false, message: "Unable to update profile." });
    }
});

router.post("/api/profile/avatar", isLoggedIn, handleAvatarUpload, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Choose an image to upload." });
    }

    try {
        const avatarUrl = req.file.path || req.file.secure_url;
        await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl });
        return res.json({ success: true, message: "Profile photo updated.", avatarUrl });
    } catch (err) {
        console.error("Avatar upload error:", err);
        return res.status(500).json({ success: false, message: "Unable to update profile photo." });
    }
});

router.delete("/api/profile/avatar", isLoggedIn, async (req, res) => {
    try {
        const avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
        await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl });
        return res.json({ success: true, message: "Profile photo removed.", avatarUrl });
    } catch (err) {
        console.error("Avatar removal error:", err);
        return res.status(500).json({ success: false, message: "Unable to remove profile photo." });
    }
});

router.post("/api/saved/toggle", isLoggedIn, async (req, res) => {
    try {
        const { itemId, itemType } = req.body;
        const fields = {
            stay: "wishlist",
            experience: "savedExperiences",
            destination: "savedDestinations",
        };
        const field = fields[itemType];

        if (!field || !mongoose.isValidObjectId(itemId)) {
            return res.status(400).json({ success: false, message: "Invalid saved item." });
        }

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        const savedItems = user[field];
        const existingIndex = savedItems.findIndex((savedId) => savedId.toString() === itemId);
        const isSaved = existingIndex === -1;

        if (isSaved) savedItems.push(itemId);
        else savedItems.splice(existingIndex, 1);

        await user.save();
        return res.json({ success: true, isSaved, count: savedItems.length });
    } catch (err) {
        console.error("Saved toggle error:", err);
        return res.status(500).json({ success: false, message: "Error updating saved status." });
    }
});

router.get("/bookings", isLoggedIn, async (req, res) => {
    try {
        const dbBookings = await Booking.find({ user: req.user._id })
            .populate("experience")
            .sort({ checkIn: -1, createdAt: -1 });
        const defaultBookings = [
            {
                _id: "book_01",
                title: "Sunset Cliff Villa",
                location: "Oia, Santorini, Greece",
                itemType: "Stay",
                image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
                dateRange: "12 Mar 2026 – 16 Mar 2026 (4 Nights)",
                guests: "2 Guests",
                tags: ["Entire Villa", "Sea View", "Free Cancellation"],
                status: "Confirmed",
                totalPrice: 50000,
            },
            {
                _id: "book_02",
                title: "Mountain View Cabin",
                location: "Manali, Himachal Pradesh, India",
                itemType: "Stay",
                image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80",
                dateRange: "5 Jan 2026 – 8 Jan 2026 (3 Nights)",
                guests: "2 Guests",
                tags: ["Mountain View", "Breakfast Included", "Free Cancellation"],
                status: "Upcoming",
                totalPrice: 20400,
            },
            {
                _id: "book_03",
                title: "Scuba Diving Experience",
                location: "Andaman, India",
                itemType: "Experience",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
                dateRange: "20 Dec 2025 • 10:00 AM",
                guests: "1 Person",
                tags: ["3–4 Hours", "Expert Guide", "All Equipment Included"],
                status: "Completed",
                totalPrice: 8500,
            },
            {
                _id: "book_04",
                title: "Riverside Retreat",
                location: "Goa, India",
                itemType: "Stay",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
                dateRange: "15 Nov 2025 – 18 Nov 2025 (3 Nights)",
                guests: "2 Guests",
                tags: ["Beachfront", "Free Breakfast", "Free Cancellation"],
                status: "Cancelled",
                totalPrice: 15600,
            },
        ];

        const bookings = dbBookings.length > 0
            ? dbBookings.map((booking) => ({
                _id: booking._id,
                title: booking.title || booking.experience?.title || "Experience Booking",
                location: booking.location || booking.experience?.location || "India",
                itemType: booking.itemType || (booking.experience ? "Experience" : "Stay"),
                image: booking.image || booking.experience?.image?.url || booking.experience?.image || "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
                dateRange: booking.checkIn
                    ? booking.checkIn.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
                      (booking.checkOut ? ` – ${booking.checkOut.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : "")
                    : booking.date || "Date not available",
                guests: `${booking.guests || 1} Guests`,
                tags: ["Verified Booking"],
                status: booking.status || "Confirmed",
                totalPrice: booking.totalPrice || booking.totalAmount || 0,
            }))
            : defaultBookings;

        res.render("bookings/index.ejs", {
            bookings,
            activeTab: "bookings",
            activeAccountTab: "bookings",
        });
    } catch (err) {
        console.error("Bookings route error:", err);
        req.flash("error", "Unable to load bookings.");
        res.redirect("/");
    }
});

// ==========================================
// MY REVIEWS ROUTE (GET /reviews)
// ==========================================
router.get("/reviews", isLoggedIn, async (req, res) => {
    try {
        // Reference Default Reviews dataset matching the image
        const defaultReviews = [
            {
                _id: "rev_01",
                title: "Sunset Cliff Villa",
                location: "Oia, Santorini, Greece",
                itemType: "Stay",
                image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
                stayDate: "Stayed from 12 Mar 2026 – 16 Mar 2026",
                reviewDate: "12 Mar 2026",
                rating: 5.0,
                comment: "Absolutely amazing stay! The view was breathtaking, the villa was clean and well-maintained. The host was very responsive and helpful. Would love to visit again!"
            },
            {
                _id: "rev_02",
                title: "Scuba Diving Experience",
                location: "Andaman, India",
                itemType: "Experience",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
                stayDate: "20 Dec 2025",
                reviewDate: "20 Dec 2025",
                rating: 4.0,
                comment: "Great experience overall! The instructors were professional and made it very safe and enjoyable. The underwater views were beautiful. The only issue was the waiting time, otherwise it was perfect."
            },
            {
                _id: "rev_03",
                title: "Mountain View Cabin",
                location: "Manali, Himachal Pradesh, India",
                itemType: "Stay",
                image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80",
                stayDate: "5 Jan 2026 – 8 Jan 2026",
                reviewDate: "5 Jan 2026",
                rating: 4.5,
                comment: "Cozy and peaceful cabin with stunning mountain views. The place was clean, warm and had all the basic amenities. The host was friendly and helpful. Great for a relaxing getaway."
            },
            {
                _id: "rev_04",
                title: "Riverside Retreat",
                location: "Goa, India",
                itemType: "Stay",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
                stayDate: "15 Nov 2025 – 18 Nov 2025",
                reviewDate: "15 Nov 2025",
                rating: 5.0,
                comment: "Loved the stay! The location is perfect, close to the beach, and the property is beautiful. Very clean and spacious. Highly recommended!"
            }
        ];

        let dbReviews = await Review.find({ author: req.user._id }).populate("listing");
        let allReviews = defaultReviews;

        if (dbReviews && dbReviews.length > 0) {
            const mapped = dbReviews.map(r => ({
                _id: r._id,
                title: (r.listing && r.listing.title) || "Custom Stay",
                location: (r.listing && r.listing.location) || "India",
                itemType: "Stay",
                image: (r.listing && r.listing.image && (typeof r.listing.image === 'string' ? r.listing.image : r.listing.image.url)) || "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
                stayDate: "Recent Stay",
                reviewDate: r.createdAt ? r.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Today",
                rating: Number(r.rating) || 5.0,
                comment: r.comment
            }));
            allReviews = [...mapped, ...defaultReviews];
        }

        res.render("reviews/index.ejs", {
            reviews: allReviews,
            activeTab: "reviews",
            activeAccountTab: "reviews"
        });
    } catch (err) {
        console.error("Reviews page error:", err);
        req.flash("error", "Unable to load reviews.");
        res.redirect("/");
    }
});

// POST /api/reviews/update
router.post("/api/reviews/update", isLoggedIn, async (req, res) => {
    try {
        const { id, rating, comment } = req.body;
        await Review.findOneAndUpdate(
            { _id: id, author: req.user._id },
            { rating: Number(rating), comment }
        );
        return res.json({ success: true, message: "Review updated successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error updating review." });
    }
});
// GET /settings
router.get("/settings", isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render("settings/index.ejs", {
        user,
        activeTab: "settings",
        activeAccountTab: "settings"
    });
});

// POST /api/settings/account
router.post("/api/settings/account", isLoggedIn, async (req, res) => {
    try {
        const { fullName, phone, location, bio } = req.body;
        let firstName = req.user.firstName;
        let lastName = req.user.lastName;

        if (fullName) {
            const parts = fullName.trim().split(" ");
            firstName = parts[0] || "";
            lastName = parts.slice(1).join(" ") || "";
        }

        await User.findByIdAndUpdate(req.user._id, {
            firstName,
            lastName,
            phone: phone ? phone.trim() : "",
            location: location ? location.trim() : "",
            bio: bio ? bio.trim() : ""
        });

        return res.json({ success: true, message: "Account settings updated successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error updating account settings." });
    }
});

// POST /api/settings/password
router.post("/api/settings/password", isLoggedIn, async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "New passwords do not match." });
        }

        const user = await User.findById(req.user._id);
        user.changePassword(currentPassword, newPassword, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Incorrect current password." });
            }
            return res.json({ success: true, message: "Password updated successfully." });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error changing password." });
    }
});

// POST /api/settings/preferences
router.post("/api/settings/preferences", isLoggedIn, async (req, res) => {
    try {
        const prefs = req.body;
        await User.findByIdAndUpdate(req.user._id, {
            preferences: prefs
        });
        return res.json({ success: true, message: "Preferences updated." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to save preferences." });
    }
});

// GET /api/settings/export-data
router.get("/api/settings/export-data", isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).select("-hash -salt");
    res.setHeader("Content-disposition", "attachment; filename=wonderlust-data.json");
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(user, null, 2));
    res.end();
});

module.exports = router;
