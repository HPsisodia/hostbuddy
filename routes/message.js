const express = require('express');
const router = express.Router();

const { message } = require("../controllers/message");



router.post('/message', message);
router.get('/message', (req,res) =>{
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render("message");
});


module.exports = router;