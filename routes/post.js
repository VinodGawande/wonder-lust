const express = require("express");
const router = express.Router();

// index
router.get("/", (req,res) => {
    res.send("GET for posts");
});

// show 
router.get("/:id", (req,res) => {
    res.send("GET for post id");
});

// post 
router.post("/", (req,res) => {
    res.send("POST for posts");
});

// delete
router.delete("/:id", (req,res) => {
    res.send("DELETE for posts id");
});

module.exports = router;