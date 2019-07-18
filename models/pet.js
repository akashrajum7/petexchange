const   mongoose = require("mongoose");
        User     = require("./user")
        
//Pet schema
var petSchema = new mongoose.Schema({
    title: String,
    imageurl: String,
    discription: String,
    location: String,
    price: Number,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

var Pet = mongoose.model("Pet",petSchema);

//We are exporting 
module.exports = Pet;