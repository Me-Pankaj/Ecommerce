const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.URI).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDB;
