const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingId: { type: String, unique: true, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    experience: {
        type: Schema.Types.ObjectId,
        ref: "Experience",
        required: true,
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
    },
    bookingCode: String,
    title: {
        type: String,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    },
    itemType: {
        type: String,
        enum: ["Stay", "Experience"],
        default: "Stay",
    },
    date: { type: String, required: true },
    checkIn: Date,
    checkOut: {
        type: Date,
    },
    guests: {
        type: Number,
        default: 1,
    },
    guestDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    pricePerGuest: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    serviceFee: { type: Number, required: true },
    taxes: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    totalPrice: Number,
    paymentMethod: { type: String, default: "UPI" },
    paymentStatus: { type: String, default: "Completed" },
    status: {
        type: String,
        enum: ["Confirmed", "Completed", "Cancelled"],
        default: "Confirmed",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Booking", bookingSchema);