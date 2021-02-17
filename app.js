const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

global.appRoot = path.resolve(__dirname);

// Logs Cache controlling Https
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// const static_path = path.join(__dirname, '/public/images');
// console.log(__dirname, '/views/images');
app.use(express.static('public'));
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "hbs");

const webhookRoute = require('./routes/webhook');
const messageRoute = require('./routes/message');


app.use("/", webhookRoute);
app.use("/", messageRoute);

app.get("/", async(req,res) => {
    res.render("dashboard");
})

// app.use((req, res, next) => {
//     console.log("here");
//   if(req.cookies.jwt && req.cookies.jwt !== "loggedout" ){
//     res.status(404).render('doNotServe');
//   }else{
//     res.status(404).render('doNotServeLogin');
//   }
//   });

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL ////add mongo database URI here

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Application is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });  
