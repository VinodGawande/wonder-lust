const Experience = require("../models/experience");
const Booking = require("../models/booking");

// Seed data matching the reference UI
const seedInitialExperiences = async () => {
    const count = await Experience.countDocuments();
    if (count === 0) {
        const initialData = [
            {
                title: "Private Yacht Sunset Cruise",
                slug: "private-yacht-sunset-cruise",
                category: "Water Activities",
                badge: "Guest Favorite",
                location: "Amalfi Coast",
                country: "Italy",
                duration: "2 hours",
                maxGuests: 8,
                price: 12000,
                rating: 4.96,
                reviewCount: 324,
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80"
                ],
                description: "Experience the ultimate Italian coastal luxury. Sail through azure Mediterranean waters, toast champagne at golden hour, and swim in secluded cliff grottos.",
                included: ["Private 45ft Luxury Yacht", "Professional Captain & Host", "Champagne & Gourmet Appetizers", "Snorkeling Equipment & Towels"],
                itinerary: [
                    { time: "5:00 PM", title: "Boarding at Marina Grande", description: "Meet your private captain with a welcoming prosecco drink." },
                    { time: "5:30 PM", title: "Faraglioni & Coastal Caves", description: "Glide past towering cliffs and hidden emerald caves." },
                    { time: "6:30 PM", title: "Sunset Toast & Swim", description: "Anchor at sunset with drinks and appetizers." },
                    { time: "7:00 PM", title: "Marina Return", description: "Smooth docking under harbor twilight lights." }
                ],
                meetingPoint: { address: "Pier 4, Marina Grande, Capri", landmark: "Opposite Bar Tiberio" }
            },
            {
                title: "Scuba Diving Experience",
                slug: "scuba-diving-experience",
                category: "Water Activities",
                badge: "Best Seller",
                location: "North Atoll",
                country: "Maldives",
                duration: "3 hours",
                maxGuests: 6,
                price: 8500,
                rating: 4.92,
                reviewCount: 218,
                image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                ],
                description: "Dive into the crystalline waters of the Maldives with PADI certified master divers. Encounter manta rays, reef sharks, and untouched coral ecosystems.",
                included: ["Full Scuba Gear & Tank", "PADI Certified Instructor", "Underwater 4K Video/Photos", "Speedboat Transfer"],
                itinerary: [
                    { time: "9:00 AM", title: "Briefing & Gear Fitting", description: "Safety instructions and equipment check." },
                    { time: "10:00 AM", title: "First Reef Dive (18m)", description: "Explore the sunken barrier reef." },
                    { time: "11:30 AM", title: "Surface Interval & Refreshments", description: "Fruit platters and coconut water on boat." }
                ],
                meetingPoint: { address: "Dive Center Jetty, Malé Atoll", landmark: "Near Marine Police Station" }
            },
            {
                title: "Wine Tasting in Tuscan Hills",
                slug: "wine-tasting-in-tuscan-hills",
                category: "Food & Dining",
                badge: "Guest Favorite",
                location: "Tuscany",
                country: "Italy",
                duration: "4 hours",
                maxGuests: 10,
                price: 9200,
                rating: 4.88,
                reviewCount: 176,
                image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80"
                ],
                description: "Stroll through centuries-old vineyards in Chianti, meet 4th generation winemakers, and taste vintage Reserve wines paired with artisan cheeses.",
                included: ["Tour of Cellars & Vineyards", "6 Premium Wine Tastings", "Tuscan Lunch with Truffles", "Private Vineyard Transport"],
                itinerary: [
                    { time: "11:00 AM", title: "Vineyard Walk", description: "Learn Chianti Classico heritage." },
                    { time: "12:30 PM", title: "Cellar Tasting", description: "Oak-barrel sample tastings with sommelier." },
                    { time: "2:00 PM", title: "Family Lunch", description: "Farm-to-table courses overlooking rolling hills." }
                ],
                meetingPoint: { address: "Castello di Verrazzano, Greve in Chianti", landmark: "Estate Main Courtyard" }
            },
            {
                title: "Italian Cooking Class",
                slug: "italian-cooking-class",
                category: "Food & Dining",
                badge: "Best Seller",
                location: "Rome",
                country: "Italy",
                duration: "3 hours",
                maxGuests: 8,
                price: 6800,
                rating: 4.91,
                reviewCount: 342,
                image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=800&q=80"
                ],
                description: "Master handmade pasta from scratch and authentic creamy tiramisù in a Roman kitchen rooftop alongside Chef Marco.",
                included: ["All Cooking Ingredients", "Fresh Pasta & Sauce Making", "Authentic Tiramisù Workshop", "Unlimited Local Wine"],
                itinerary: [
                    { time: "4:00 PM", title: "Dough Crafting", description: "Hand-knead tagliatelle and ravioli." },
                    { time: "5:30 PM", title: "Sauce & Dessert", description: "Simmering classic sauces and espresso mascarpone." },
                    { time: "6:30 PM", title: "Rooftop Dinner", description: "Eat your own creation with wine." }
                ],
                meetingPoint: { address: "Via dei Coronari 44, Rome", landmark: "Near Piazza Navona" }
            },
            {
                title: "Hot Air Balloon Ride",
                slug: "hot-air-balloon-ride",
                category: "Adventure",
                badge: "Guest Favorite",
                location: "Cappadocia",
                country: "Turkey",
                duration: "2 hours",
                maxGuests: 12,
                price: 18000,
                rating: 4.97,
                reviewCount: 521,
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
                ],
                description: "Float peacefully over fairy chimneys, cave valleys, and rose-tinted canyon formations as sunrise ignites the Anatolian horizon.",
                included: ["Hotel Pickup & Dropoff", "Pre-flight Breakfast Buffet", "1-Hour Sunrise Flight", "Champagne Toast & Flight Certificate"],
                itinerary: [
                    { time: "5:00 AM", title: "Pickup & Light Breakfast", description: "Coffee, tea, and warm pastries." },
                    { time: "5:45 AM", title: "Takeoff at Dawn", description: "Gentle ascent as balloons fill the sky." },
                    { time: "7:00 AM", title: "Touchdown Celebration", description: "Traditional non-alcoholic champagne toast." }
                ],
                meetingPoint: { address: "Göreme Valley Launch Field", landmark: "Hot Air Balloon Central" }
            },
            {
                title: "Kyoto Cultural Tour",
                slug: "kyoto-cultural-tour",
                category: "Arts & Culture",
                badge: "New",
                location: "Kyoto",
                country: "Japan",
                duration: "5 hours",
                maxGuests: 8,
                price: 7200,
                rating: 4.85,
                reviewCount: 198,
                image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
                gallery: [
                    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
                ],
                description: "Walk the vermilion torii paths of Fushimi Inari, explore hidden bamboo groves, and attend a private Zen tea ceremony in Gion.",
                included: ["Licensed English Historian Guide", "Authentic Matcha Tea Ceremony", "Fushimi Inari & Gion Walking Tour", "Traditional Japanese Sweets"],
                itinerary: [
                    { time: "9:00 AM", title: "Fushimi Inari Shrine", description: "Morning hike through 10,000 red gates." },
                    { time: "11:30 AM", title: "Gion Historical District", description: "Spot preserved geisha teahouses." },
                    { time: "1:00 PM", title: "Zen Tea Experience", description: "Private temple tea ritual." }
                ],
                meetingPoint: { address: "Inari Station Exit, Kyoto", landmark: "In front of JR Ticket Gate" }
            }
        ];
        await Experience.insertMany(initialData);
    }
};

module.exports.index = async (req, res) => {
    await seedInitialExperiences();
    const { category, search, where, guests } = req.query;
    let filter = {};

    if (category && category !== "Trending") {
        filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const searchQuery = search || where;
    if (searchQuery) {
        filter.$or = [
            { title: { $regex: searchQuery,$options: "i" } },
            { location: { $regex: searchQuery,$options: "i" } },
            { country: { $regex: searchQuery,$options: "i" } }
        ];
    }

    if (guests && Number(guests) > 0) {
        filter.maxGuests = { $gte: Number(guests) };
    }

    const experiences = await Experience.find(filter);
    res.render("experiences/index.ejs", {
        experiences,
        activeCategory: category || "Trending",
        activeTab: "experiences",
        searchParams: { where: searchQuery || "", guests: guests || "" }
    });
};

module.exports.search = async (req, res) => {
    const { where, when, guests } = req.query;
    let filter = {};

    if (where) {
        filter.$or = [
            { title: { $regex: where,$options: "i" } },
            { location: { $regex: where,$options: "i" } },
            { country: { $regex: where,$options: "i" } }
        ];
    }

    if (guests && Number(guests) > 0) {
        filter.maxGuests = { $gte: Number(guests) };
    }

    const experiences = await Experience.find(filter);
    res.render("experiences/index.ejs", {
        experiences,
        activeCategory: "Trending",
        activeTab: "experiences",
        searchParams: { where: where || "", when: when || "", guests: guests || "" }
    });
};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    let experience;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        experience = await Experience.findById(id);
    } else {
        experience = await Experience.findOne({ slug: id });
    }

    if (!experience) {
        req.flash("error", "Experience not found!");
        return res.redirect("/experiences");
    }

    res.render("experiences/show.ejs", { experience, activeTab: "experiences" });
};

// Review Submission Handler
module.exports.addReview = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    let experience;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        experience = await Experience.findById(id);
    } else {
        experience = await Experience.findOne({ slug: id });
    }

    if (experience) {
        const newRatingVal = Number(rating) || 5;
        const totalScore = (experience.rating * experience.reviewCount) + newRatingVal;
        experience.reviewCount += 1;
        experience.rating = Number((totalScore / experience.reviewCount).toFixed(2));
        await experience.save();
        req.flash("success", "Review submitted successfully!");
    }

    res.redirect(`/experiences/${id}`);
};

module.exports.checkout = async (req, res) => {
    const { id } = req.params;
    const { date, guests, slot } = req.query;

    let experience;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        experience = await Experience.findById(id);
    } else {
        experience = await Experience.findOne({ slug: id });
    }

    if (!experience) {
        req.flash("error", "Experience not found!");
        return res.redirect("/experiences");
    }

    const numGuests = Number(guests) || 2;
    const subtotal = experience.price * numGuests;
    const serviceFee = Math.round(subtotal * 0.08);
    const taxes = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + serviceFee + taxes;

    res.render("experiences/checkout.ejs", {
        experience,
        date: date || new Date().toISOString().split("T")[0],
        slot: slot || "05:00 PM - Sunset Cruise",
        guests: numGuests,
        subtotal,
        serviceFee,
        taxes,
        totalAmount,
        activeTab: "experiences"
    });
};

module.exports.book = async (req, res) => {
    const { id } = req.params;
    const { date, slot, guests, firstName, lastName, email, phone, paymentMethod } = req.body;

    let experience;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        experience = await Experience.findById(id);
    } else {
        experience = await Experience.findOne({ slug: id });
    }

    const numGuests = Number(guests) || 1;
    const subtotal = experience.price * numGuests;
    const serviceFee = Math.round(subtotal * 0.08);
    const taxes = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + serviceFee + taxes;

    const bookingId = "WL-EXP-" + Math.floor(100000 + Math.random() * 900000);

    const newBooking = new Booking({
        bookingId,
        user: req.user ? req.user._id : undefined,
        experience: experience._id,
        date: `${date} (${slot || 'Evening Slot'})`,
        guests: numGuests,
        guestDetails: { firstName, lastName, email, phone },
        pricePerGuest: experience.price,
        subtotal,
        serviceFee,
        taxes,
        totalAmount,
        paymentMethod: paymentMethod || "UPI",
        paymentStatus: "Completed"
    });

    await newBooking.save();
    res.redirect(`/booking/success?bookingId=${bookingId}`);
};

module.exports.success = async (req, res) => {
    const { bookingId } = req.query;
    const booking = await Booking.findOne({ bookingId }).populate("experience");

    if (!booking) {
        req.flash("error", "Booking record not found!");
        return res.redirect("/experiences");
    }

    res.render("experiences/success.ejs", { booking, activeTab: "experiences" });
};