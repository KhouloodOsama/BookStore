const mongoose = require("mongoose");
async function connectToDB() {
    // Connection to database
// const dburl = "mongodb://127.0.0.1/urlShortener"
// mongoose.connect(dburl,{ useNewUrlParser: true , useUnifiedTopology: true })
try{
    await mongoose
    .connect("mongodb://127.0.0.1/bookStoreDB")
     console.log("Connected To MongoDB....")
}catch(error){
    console.log("Connection Failed To MongoDB!", error)
}
}
module.exports = connectToDB;
// mongoose
// .connect("mongodb://127.0.0.1/bookStoreDB")
// .then(()=> console.log("Connected To MongoDB...."))
// .catch((error)=>console.log("Connection Failed To MongoDB!", error));
// } 