const app= require('./app.js')
const connectDB = require('./config/db.js');

const dotenv= require('dotenv');
//config
dotenv.config({path:"backend/config/config.env"})

const PORT = 4000;
connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening onm PORT ${PORT}`)
})
