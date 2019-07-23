const   mongoose = require("mongoose");
        User     = require("./user")
        
//Pet schema
var petSchema = new mongoose.Schema({
    title: String,
    imageurl: String,
    description: String,
    location: String,
    price: Number,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

var Pet = mongoose.model("Pet",petSchema);

//Exporting pet model 
module.exports = Pet;