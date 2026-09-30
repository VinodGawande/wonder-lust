const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingId: { type: String, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    experience: { type: Schema.Types.ObjectId, ref: "Experience", required: true },
    date: { type: String, required: true },
    guests: { type: Number, default: 1 },
    guestDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    pricePerGuest: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    serviceFee: { type: Number, required: true },
    taxes: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "UPI" },
    paymentStatus: { type: String, default: "Completed" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);