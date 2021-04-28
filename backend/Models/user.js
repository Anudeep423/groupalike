const mongoose = require("mongoose");

const User = new mongoose.Schema({

    name : {
        required : true,
        type : String
    },
    offers : {
        required : true,
        type : Array
    }


})

module.exports = mongoose.model("Users", User )