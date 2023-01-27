const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false)
const uri =process.env.mondoDB_Api
const connection = mongoose
.connect(uri)
.then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log("Error connection to the database", err);
});
mongoose.modelNames.exports = connection;