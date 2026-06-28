const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    let owner = await User.findOne({});
    if (!owner) {
        owner = new User({ email: "demo@wanderlust.com", username: "demo-user" });
        await User.register(owner, "helloworld");
    }

    initData.data = initData.data.map((obj) => ({ ...obj, owner: owner._id }));
    await Listing.insertMany(initData.data);
    console.log("data was Initialized");
    await mongoose.disconnect();
};

initDB();
