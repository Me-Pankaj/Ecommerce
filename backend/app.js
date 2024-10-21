const express = require("express")
const product= require('./routes/productRoute.js')

const app = express();
app.use(express.json());


app.use('/api/v1',product)

// app.get('/',()=>{
//     res.status(200).json({message:"I am"});
//     console.log("hii")
// })

module.exports=app;
