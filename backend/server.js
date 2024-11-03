const app= require('./app.js')
const connectDB = require('./config/db.js');
const dotenv= require('dotenv');

// Handling Uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to Uncaught Exception`);
    process.exit(1);
})





//config
dotenv.config({path:"backend/config/config.env"})

const PORT = 4000;
connectDB();

// console.log(youtube);

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is listening onm PORT ${PORT}`)
})

// Unhandled Promise Rejection -> like wrong mongo uri string thsi type
// In this I have to close server any how

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})


