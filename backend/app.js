const express = require("express")
const product= require('./routes/productRoute.js')
const user= require('./routes/userRoute.js')
const errorMiddleware= require("./middleware/error.js")

const app = express();
app.use(express.json());


app.use('/api/v1',product)
app.use('/api/v1',user)

// app.get('/',()=>{
//     res.status(200).json({message:"I am"});
//     console.log("hii")
// })

// Middlewware for Error
app.use(errorMiddleware);


module.exports=app;
