const express = require("express");

const router = express.Router();



router.get("/", (req ,res) =>{
    res.render("login")
});

router.get("/register", (req ,res) =>{
    res.render("register")
});

router.get("/order", (req ,res) =>{
    res.render("order")
});

router.get("/pickup", (req ,res) =>{
    res.render("pickup")
});

router.get("/history", (req ,res) =>{
    res.render("history")
});

router.get("/profile", (req ,res) =>{
    res.render("profile")
});




module.exports = router;
