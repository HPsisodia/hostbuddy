const axios = require('axios');
const fs = require('fs');

const {
    statusCode,
    returnErrorJsonResponse,
    returnJsonResponse,
  } = require("../Helpers/status.js");

exports.message = async (req,res) =>{
    try {
        const message = req.body.data;

         var totalOrder = []
        
        const order = {
          name: message.name,
          message: message.message
        }

        const readFile = fs.readFileSync(appRoot + '/public/data/order.json', 'utf-8')

        if(!readFile){
          totalOrder.push(order)
          totalOrder = JSON.stringify(totalOrder,null,2)
        }else{
          const newData = JSON.parse(readFile)
          newData.push(order)
          totalOrder = JSON.stringify(newData,null,2)
        }
        
        const file = fs.writeFileSync(appRoot + '/public/data/order.json', totalOrder);
        return res.send('success');


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

