const mongoose = require('mongoose')


const connect = async()=>{
    await mongoose.connect('mongodb+srv://kbpatel3019:ecommerce@cluster0.gj9j6kh.mongodb.net/?retryWrites=true&w=majority')
    console.log("Database connection")
}

module.exports = connect