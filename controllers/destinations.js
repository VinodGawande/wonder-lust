const Destination = require("../models/destination");
const Listing = require("../models/listing");
const Experience = require("../models/experience");

const seedInitialDestinations = async () => {
    try {
        const count = await Destination.countDocuments();
        if (count === 0) {
            const initialData = [
                {
                    name: "Bali",
                    slug: "bali",
                    country: "Indonesia",
                    region: "Southeast Asia",
                    stayCount: "1,200+ stays",
                    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Beach", "Islands", "Cultural", "Romantic", "Luxury"],
                    isPopular: true,
                    isTrending: false,
                    description: "Bali is an Indonesian paradise known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. Home to religious sites such as cliffside Uluwatu Temple, vibrant art markets, and world-class luxury wellness retreats.",
                    highlights: ["Tropical Beaches", "Cliffside Temples", "Lush Rice Terraces", "Wellness & Spas"],
                    popularAreas: ["Seminyak", "Ubud", "Canggu", "Uluwatu", "Nusa Dua"],
                    bestTimeToVisit: "April to October",
                    averageStay: "5 - 8 days",
                    language: "Indonesian, Balinese, English",
                    currency: "Indonesian Rupiah (IDR)",
                    thingsToDo: [
                        { title: "Watch Uluwatu Sunset Kecak Dance", description: "Perched atop a 70-meter cliff overlooking the Indian Ocean." },
                        { title: "Sunrise Trek at Mount Batur", description: "Hike up an active volcano for breathtaking sunrise caldera views." }
                    ]
                },
                {
                    name: "Santorini",
                    slug: "santorini",
                    country: "Greece",
                    region: "Cyclades",
                    stayCount: "980+ stays",
                    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Islands", "Romantic", "Luxury", "Beach"],
                    isPopular: true,
                    isTrending: false,
                    description: "Santorini is famous for its dramatic caldera views, whitewashed cave houses, blue-domed churches and legendary sunsets over the Aegean Sea.",
                    highlights: ["Caldera Sunset Views", "Volcanic Black Sand Beaches", "Oia Village Walks"],
                    popularAreas: ["Oia", "Fira", "Imerovigli"],
                    bestTimeToVisit: "May to October",
                    averageStay: "3 - 5 days",
                    language: "Greek, English",
                    currency: "Euro (EUR)",
                    thingsToDo: [
                        { title: "Sunset in Oia", description: "Witness the iconic golden light washing over white cliffside buildings." }
                    ]
                },
                {
                    name: "Switzerland",
                    slug: "switzerland",
                    country: "Alpine region",
                    region: "Central Europe",
                    stayCount: "650+ stays",
                    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Mountain", "Nature", "Adventure"],
                    isPopular: true,
                    isTrending: false,
                    description: "A land of snow-dusted alpine summits, pristine turquoise glacial lakes, and scenic train journeys cutting through high mountain passes.",
                    highlights: ["Matterhorn Views", "Glacial Lakes", "Panoramic Alpine Trains"],
                    popularAreas: ["Zermatt", "Interlaken", "Lucerne"],
                    bestTimeToVisit: "December to March or June to September",
                    averageStay: "6 - 9 days",
                    language: "German, French, English",
                    currency: "Swiss Franc (CHF)",
                    thingsToDo: [
                        { title: "Ride Glacier Express", description: "Panoramic train across mountain viaducts." }
                    ]
                },
                {
                    name: "Maldives",
                    slug: "maldives",
                    country: "Indian Ocean",
                    region: "South Asia",
                    stayCount: "420+ stays",
                    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Islands", "Beach", "Luxury", "Romantic"],
                    isPopular: true,
                    isTrending: false,
                    description: "Archipelago of private island overwater villas, untouched coral reefs, and luminous beaches.",
                    highlights: ["Overwater Bungalows", "Manta Ray Diving"],
                    popularAreas: ["North Malé Atoll", "Baa Atoll"],
                    bestTimeToVisit: "November to April",
                    averageStay: "4 - 7 days",
                    language: "Dhivehi, English",
                    currency: "USD / MVR",
                    thingsToDo: [
                        { title: "Dolphin Cruise", description: "Watch spinner dolphins in the sunset." }
                    ]
                },
                {
                    name: "Kyoto",
                    slug: "kyoto",
                    country: "Japan",
                    region: "Kansai",
                    stayCount: "380+ stays",
                    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Cultural", "Cities", "Romantic"],
                    isPopular: true,
                    isTrending: false,
                    description: "Historical heart of Japan with over 2,000 shrines, preserved machiya houses, and geisha culture.",
                    highlights: ["Fushimi Inari", "Bamboo Forest"],
                    popularAreas: ["Gion", "Arashiyama"],
                    bestTimeToVisit: "March to May",
                    averageStay: "3 - 5 days",
                    language: "Japanese, English",
                    currency: "JPY",
                    thingsToDo: [
                        { title: "Torii Gates Walk", description: "Hike through 10,000 red gates." }
                    ]
                },
                {
                    name: "New York",
                    slug: "new-york",
                    country: "USA",
                    region: "East Coast",
                    stayCount: "1,150+ stays",
                    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Cities", "Cultural", "Luxury"],
                    isPopular: true,
                    isTrending: false,
                    description: "Iconic skyline, Broadway theater, Central Park, and world-class dining neighborhoods.",
                    highlights: ["Skyline Views", "Broadway Shows"],
                    popularAreas: ["Manhattan", "Brooklyn"],
                    bestTimeToVisit: "September to November",
                    averageStay: "4 - 7 days",
                    language: "English",
                    currency: "USD",
                    thingsToDo: [
                        { title: "Brooklyn Bridge Walk", description: "Panoramic skyline views." }
                    ]
                },
                {
                    name: "Dubai",
                    slug: "dubai",
                    country: "UAE",
                    region: "Middle East",
                    stayCount: "940+ stays",
                    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Cities", "Luxury", "Adventure"],
                    isPopular: false,
                    isTrending: true,
                    description: "Ultramodern architecture, luxury shopping, man-made islands, dune safaris, and rooftop nightlife.",
                    highlights: ["Burj Khalifa", "Desert Safari"],
                    popularAreas: ["Downtown Dubai", "Marina"],
                    bestTimeToVisit: "November to March",
                    averageStay: "4 - 6 days",
                    language: "Arabic, English",
                    currency: "AED",
                    thingsToDo: [
                        { title: "Desert Safari", description: "Dune bashing and dinner." }
                    ]
                },
                {
                    name: "Paris",
                    slug: "paris",
                    country: "France",
                    region: "Western Europe",
                    stayCount: "870+ stays",
                    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Cities", "Romantic", "Cultural"],
                    isPopular: false,
                    isTrending: true,
                    description: "City of Light with monumental boulevards, Eiffel Tower vistas, Louvre museum, and cafe culture.",
                    highlights: ["Eiffel Tower", "Seine Cruise"],
                    popularAreas: ["Montmartre", "Le Marais"],
                    bestTimeToVisit: "April to June",
                    averageStay: "4 - 6 days",
                    language: "French, English",
                    currency: "EUR",
                    thingsToDo: [
                        { title: "Seine River Cruise", description: "Sunset boat tour." }
                    ]
                },
                {
                    name: "Goa",
                    slug: "goa",
                    country: "India",
                    region: "West Coast",
                    stayCount: "730+ stays",
                    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Beach", "Budget", "Romantic"],
                    isPopular: false,
                    isTrending: true,
                    description: "Golden sand beaches, coconut groves, Portuguese colonial heritage, and beachfront shacks.",
                    highlights: ["Beaches", "Fontainhas"],
                    popularAreas: ["Anjuna", "Panaji"],
                    bestTimeToVisit: "November to March",
                    averageStay: "4 - 7 days",
                    language: "Konkani, Hindi, English",
                    currency: "INR",
                    thingsToDo: [
                        { title: "Sunset at Chapora", description: "Scenic cliff views." }
                    ]
                },
                {
                    name: "Manali",
                    slug: "manali",
                    country: "India",
                    region: "Himachal Pradesh",
                    stayCount: "510+ stays",
                    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Mountain", "Nature", "Adventure"],
                    isPopular: false,
                    isTrending: true,
                    description: "Himalayan resort town on the banks of Beas River with alpine views and snow passes.",
                    highlights: ["Snow Peaks", "Solang Valley"],
                    popularAreas: ["Old Manali", "Solang"],
                    bestTimeToVisit: "October to June",
                    averageStay: "3 - 6 days",
                    language: "Hindi, English",
                    currency: "INR",
                    thingsToDo: [
                        { title: "Paragliding", description: "Fly over Solang valley." }
                    ]
                },
                {
                    name: "Udaipur",
                    slug: "udaipur",
                    country: "India",
                    region: "Rajasthan",
                    stayCount: "460+ stays",
                    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Cultural", "Romantic", "Luxury"],
                    isPopular: false,
                    isTrending: true,
                    description: "The City of Lakes crowned by royal marble palaces and serene boat rides.",
                    highlights: ["City Palace", "Lake Pichola"],
                    popularAreas: ["Lake Pichola Waterfront", "Old City"],
                    bestTimeToVisit: "October to March",
                    averageStay: "3 - 4 days",
                    language: "Hindi, English",
                    currency: "INR",
                    thingsToDo: [
                        { title: "Lake Boat Ride", description: "Sunset cruise by the palace." }
                    ]
                },
                {
                    name: "Kerala",
                    slug: "kerala",
                    country: "India",
                    region: "South India",
                    stayCount: "520+ stays",
                    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
                    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80",
                    category: ["All Destinations", "Nature", "Wellness", "Romantic"],
                    isPopular: false,
                    isTrending: true,
                    description: "Emerald backwaters, tranquil houseboat journeys, misty tea plantations, and Ayurvedic rejuvenation.",
                    highlights: ["Alleppey Backwaters", "Tea Hills"],
                    popularAreas: ["Alleppey", "Munnar"],
                    bestTimeToVisit: "September to March",
                    averageStay: "5 - 8 days",
                    language: "Malayalam, English",
                    currency: "INR",
                    thingsToDo: [
                        { title: "Houseboat Tour", description: "Canal journey through palm groves." }
                    ]
                }
            ];
            await Destination.insertMany(initialData);
        }
    } catch (err) {
        console.error("Destination Seeding Notice:", err.message);
    }
};

module.exports.index = async (req, res) => {
    await seedInitialDestinations();
    const { category, search, where } = req.query;

    let queryFilter = {};
    if (category && category !== "All Destinations") {
        queryFilter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const searchQuery = (search || where || "").trim();
    if (searchQuery) {
        queryFilter.$or = [
            { name: { $regex: searchQuery,$options: "i" } },
            { country: { $regex: searchQuery,$options: "i" } },
            { region: { $regex: searchQuery,$options: "i" } },
            { category: { $regex: searchQuery,$options: "i" } }
        ];
    }

    const allFiltered = await Destination.find(queryFilter);

    const popularDestinations = allFiltered.filter((d) => d.isPopular);
    const trendingDestinations = allFiltered.filter((d) => d.isTrending);

    const displayPopular = popularDestinations.length > 0 ? popularDestinations : allFiltered.slice(0, 6);
    const displayTrending = trendingDestinations.length > 0 ? trendingDestinations : allFiltered.slice(6, 12);

    res.render("destinations/index.ejs", {
        popularDestinations: displayPopular,
        trendingDestinations: displayTrending,
        totalFound: allFiltered.length,
        activeCategory: category || "All Destinations",
        activeTab: "destinations",
        searchParams: { where: searchQuery }
    });
};

module.exports.all = async (req, res) => {
    await seedInitialDestinations();
    const { category, search, where } = req.query;

    let queryFilter = {};
    if (category && category !== "All Destinations") {
        queryFilter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const searchQuery = (search || where || "").trim();
    if (searchQuery) {
        queryFilter.$or = [
            { name: { $regex: searchQuery,$options: "i" } },
            { country: { $regex: searchQuery,$options: "i" } },
            { region: { $regex: searchQuery,$options: "i" } },
            { category: { $regex: searchQuery,$options: "i" } }
        ];
    }

    const destinations = await Destination.find(queryFilter);

    res.render("destinations/all.ejs", {
        destinations,
        activeCategory: category || "All Destinations",
        activeTab: "destinations",
        searchParams: { where: searchQuery }
    });
};

module.exports.search = async (req, res) => {
    const { where, when, guests } = req.query;
    let queryFilter = {};

    const searchQuery = (where || "").trim();
    if (searchQuery) {
        queryFilter.$or = [
            { name: { $regex: searchQuery,$options: "i" } },
            { country: { $regex: searchQuery,$options: "i" } },
            { region: { $regex: searchQuery,$options: "i" } },
            { category: { $regex: searchQuery,$options: "i" } }
        ];
    }

    const destinations = await Destination.find(queryFilter);

    res.render("destinations/all.ejs", {
        destinations,
        activeCategory: "All Destinations",
        activeTab: "destinations",
        searchParams: { where: searchQuery, when: when || "", guests: guests || "" }
    });
};

module.exports.show = async (req, res) => {
    const { slug } = req.params;

    const destination = await Destination.findOne({
        $or: [{ slug: slug.toLowerCase() }, { name: {$regex: new RegExp(`^${slug}$`, "i") } }]
    });

    if (!destination) {
        req.flash("error", "Destination not found!");
        return res.redirect("/destinations");
    }

    // Dynamic Coordinate lookup for Interactive Map
    const coordMap = {
        bali: { lat: -8.4095, lng: 115.1889, zoom: 10 },
        santorini: { lat: 36.3932, lng: 25.4615, zoom: 11 },
        switzerland: { lat: 46.8182, lng: 8.2275, zoom: 8 },
        maldives: { lat: 3.2028, lng: 73.2207, zoom: 8 },
        kyoto: { lat: 35.0116, lng: 135.7681, zoom: 12 },
        "new-york": { lat: 40.7128, lng: -74.006, zoom: 11 },
        dubai: { lat: 25.2048, lng: 55.2708, zoom: 11 },
        paris: { lat: 48.8566, lng: 2.3522, zoom: 12 },
        goa: { lat: 15.2993, lng: 74.124, zoom: 10 },
        manali: { lat: 32.2432, lng: 77.1892, zoom: 11 },
        udaipur: { lat: 24.5854, lng: 73.7125, zoom: 12 },
        kerala: { lat: 9.9312, lng: 76.2673, zoom: 9 }
    };

    const mapData = coordMap[destination.slug] || { lat: 20.5937, lng: 78.9629, zoom: 5 };

    // Dynamic Currency Exchange rate lookup relative to INR
    const currencyData = {
        rate: destination.slug === "bali" ? 188.5 : destination.slug === "santorini" || destination.slug === "paris" ? 0.011 : destination.slug === "switzerland" ? 0.0105 : destination.slug === "dubai" ? 0.044 : destination.slug === "kyoto" ? 1.82 : 0.012,
        code: destination.slug === "bali" ? "IDR" : destination.slug === "santorini" || destination.slug === "paris" ? "EUR" : destination.slug === "switzerland" ? "CHF" : destination.slug === "dubai" ? "AED" : destination.slug === "kyoto" ? "JPY" : "USD"
    };

    const stays = await Listing.find({
        $or: [
            { location: { $regex: destination.name, $options: "i" } },
            { country: { $regex: destination.country, $options: "i" } },
            { title: { $regex: destination.name, $options: "i" } }
        ]
    }).limit(4);

    const experiences = await Experience.find({
        $or: [
            { location: { $regex: destination.name, $options: "i" } },
            { country: { $regex: destination.country, $options: "i" } },
            { title: { $regex: destination.name, $options: "i" } }
        ]
    }).limit(4);

    res.render("destinations/show.ejs", {
        destination,
        stays,
        experiences,
        mapData,
        currencyData,
        activeTab: "destinations"
    });
};