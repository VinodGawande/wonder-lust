const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const GiftCard = require("../models/giftcard.js");
const wrapAsync = require("../utils/wrapAsync.js");

// 1. Landing Page
router.get("/", (req, res) => {
    res.render("giftcards/index.ejs", { activeTab: "gift-cards" });
});

// 2. Buy Gift Card API (Purchase & Save to DB)
router.post(
    "/buy",
    wrapAsync(async (req, res) => {
        const { amount, recipientName, recipientEmail, message, occasion, senderName } = req.body;

        if (!amount || !recipientName || !recipientEmail) {
            return res.status(400).json({ success: false, message: "Kripya saari required details bharein." });
        }

        // Generate unique code like: WL-9842-AB71
        const uniqueSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
        const code = `WL-${Math.floor(1000 + Math.random() * 9000)}-${uniqueSuffix}`;

        const newCard = new GiftCard({
            code,
            amount: Number(amount),
            balance: Number(amount),
            sender: req.user ? req.user._id : null,
            senderName: req.user ? (req.user.firstName || req.user.username) : (senderName || "Friend"),
            recipientName: recipientName.trim(),
            recipientEmail: recipientEmail.trim().toLowerCase(),
            message: message ? message.trim() : "Enjoy your adventure!",
            occasion: occasion || "General",
            status: "active"
        });

        await newCard.save();

        res.json({
            success: true,
            message: `Gift card ban gaya hai! Code: ${code}`,
            giftCard: newCard
        });
    })
);

// 3. Check Voucher Balance API
router.post(
    "/check-balance",
    wrapAsync(async (req, res) => {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ success: false, message: "Voucher code daalna zaroori hai." });
        }

        const card = await GiftCard.findOne({ code: code.trim().toUpperCase() });
        if (!card) {
            return res.status(404).json({ success: false, message: "Aisa koi gift card nahi mila." });
        }

        res.json({
            success: true,
            code: card.code,
            balance: card.balance,
            status: card.status,
            recipientName: card.recipientName
        });
    })
);

module.exports = router;