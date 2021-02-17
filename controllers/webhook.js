const axios = require('axios');

const {
    statusCode,
    returnErrorJsonResponse,
    returnJsonResponse,
  } = require("../Helpers/status.js");

exports.webhook = async (req,res) =>{
    try {
        const data = req.body

        const addMessage = await axios({
            method: 'post',
            url: "http://localhost:3000/message",
            data: {
                data
            }
        });

        return res.send("Thank You")
        //res.render('thankyou');


    } catch (error) {
        return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Something went wrong, Please try again. Check internet connection",
            error
          )
        );        
    }
    
}

