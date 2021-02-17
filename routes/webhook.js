const express = require('express');
const router = express.Router();

const { webhook } = require("../controllers/webhook");


router.post('/webhook', webhook);
router.get('/webhook', (req,res) =>{
    res.render("webhook");
})

module.exports = router;