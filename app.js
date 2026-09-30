if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Models
const User = require("./models/user.js");

// Utilities & Custom Error Handling
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");

// Feature Controllers
const listingController = require("./controllers/listings.js");
const experienceController = require("./controllers/experiences.js");
const destinationController = require("./controllers/destinations.js");

// Feature Routers
const listingRouter = require("./routess/listing.js");
const reviewRouter = require("./routess/review.js");
const userRouter = require("./routess/user.js");
const experienceRouter = require("./routess/experiences.js");
const destinationRouter = require("./routess/destinations.js");
const giftCardRouter = require("./routess/giftCards.js");

// Database Configuration & Connection
const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wonderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to MongoDB Database");
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });

// View Engine & Static Directory Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Request Parsing & Method Override Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session Configuration (7 Days persistence)
const sessionOptions = {
    secret: process.env.SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Authentication (Passport Setup)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Modern Async Serialize & Deserialize (Mongoose v7/v8 safe)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Global Locals Middleware for Templates
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ==========================================
// FEATURE ROUTES MOUNTING
// ==========================================

// 1. Destinations Routes (/destinations, /destinations/all, /destinations/:slug)
app.use("/destinations", destinationRouter);

// 2. Experiences Routes (/experiences, /experiences/search, /experiences/:id)
app.use("/experiences", experienceRouter);

// 3. Gift Cards Routes (/gift-cards, /gift-cards/buy, /gift-cards/check-balance)
app.use("/gift-cards", giftCardRouter);

// 4. Listings (Stays) & Nested Reviews Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

// 5. User Authentication Routes (/login, /signup, /forgot-password, /logout)
app.use("/", userRouter);

// 6. Booking Success Receipt Route (Direct Checkout callback)
app.get("/booking/success", wrapAsync(experienceController.success));

// 7. Root Route: Redirect to /destinations
app.get("/", (req, res) => {
    res.redirect("/destinations");
});

// ==========================================
// ERROR HANDLING (Express 5 Safe)
// ==========================================

// 404 Catch-All Handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Global Error Responder
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// Server Listener
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`WonderLust server is listening on port ${port}`);
}); 
