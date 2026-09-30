const express = require("express");
const router = express.Router();
const passport = require("passport");
const crypto = require("crypto");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

// ==========================================
// 1. SIGNUP: STORE USER IN DATABASE
// ==========================================
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post(
    "/signup",
    wrapAsync(async (req, res, next) => {
        try {
            let { firstName, lastName, email, password, confirmPassword } = req.body;

            if (!email || !password) {
                req.flash("error", "Email aur Password dono zaroori hain!");
                return res.redirect("/signup");
            }

            if (password !== confirmPassword) {
                req.flash("error", "Passwords match nahi hue! Dobara check karein.");
                return res.redirect("/signup");
            }

            const cleanEmail = email.trim().toLowerCase();

            // Check if user already exists
            const existingUser = await User.findOne({ email: cleanEmail });
            if (existingUser) {
                req.flash("error", "Is email se account pehle se bana hua hai! Log in karein.");
                return res.redirect("/login");
            }

            // Save new user document in MongoDB
            const newUser = new User({
                email: cleanEmail,
                username: cleanEmail,
                firstName: firstName ? firstName.trim() : "",
                lastName: lastName ? lastName.trim() : "",
                lastLogin: new Date(),
                loginCount: 1,
                lastLoginIp: req.ip || req.connection.remoteAddress
            });

            const registeredUser = await User.register(newUser, password);

            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash("success", `Swagat hai, ${registeredUser.firstName || registeredUser.username}! Aapka account database me store ho gaya.`);
                res.redirect("/");
            });
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }
    })
);

// ==========================================
// 2. LOGIN: STORE LOGIN AUDIT IN DATABASE
// ==========================================
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

const cleanLoginInput = (req, res, next) => {
    if (req.body.username) {
        req.body.username = req.body.username.trim().toLowerCase();
    }
    next();
};

router.post(
    "/login",
    cleanLoginInput,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Email ya Password galat hai! Kripya dobara try karein.",
    }),
    wrapAsync(async (req, res) => {
        // Update login tracking metadata in database
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                lastLogin: new Date(),
                lastLoginIp: req.ip || req.connection.remoteAddress
            },
            $inc: {
                loginCount: 1
            }
        });

        const displayName = req.user.firstName || req.user.username;
        req.flash("success", `Welcome back, ${displayName}!`);
        res.redirect("/");
    })
);

// ==========================================
// 3. FORGOT PASSWORD: STORE RESET TOKEN IN DB
// ==========================================
router.get("/forgot-password", (req, res) => {
    res.render("users/forgot.ejs");
});

router.post(
    "/forgot-password",
    wrapAsync(async (req, res) => {
        const { email } = req.body;
        if (!email) {
            req.flash("error", "Kripya apna email address enter karein.");
            return res.redirect("/forgot-password");
        }

        const cleanEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: cleanEmail });

        if (!user) {
            req.flash("error", "Yeh email database me nahi mila! Pehle Sign Up karein.");
            return res.redirect("/forgot-password");
        }

        // Generate secure 32-byte crypto token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Set token expiry to 1 hour from now
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 Hour
        await user.save();

        // Temporary demo recovery: Set temporary password & save reset timestamp
        await user.setPassword("Wonderlust@123");
        user.lastPasswordReset = new Date();
        await user.save();

        req.flash(
            "success",
            `Password reset request database me save ho gayi! Token: ${resetToken.substring(0, 10)}... Temporary password set: Wonderlust@123`
        );
        res.redirect("/login");
    })
);

// ==========================================
// 4. LOGOUT
// ==========================================
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Aap successfully logout ho chuke hain.");
        res.redirect("/");
    });
});

module.exports = router; 