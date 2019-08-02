const   mongoose = require("mongoose"),
        User     = require("./user");
        
//Pet schema
var petSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

var Pet = mongoose.model("Pet",petSchema);

//Exporting pet model 
module.exports = Pet;