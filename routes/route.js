const express = require('express');
const router = express.Router();

// Gets for redirects to different pages
router.get('/home', (req, res) => {
    res.render("index.ejs"); // web side on localhost:3000/home
})

router.get('/about-us', (req, res) => {
    res.render("about-us.ejs");
})




module.exports = router;