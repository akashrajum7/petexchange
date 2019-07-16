//Initialization
const express         = require("express"),
      app             = express(),
      dotenv          = require("dotenv"),
      mongoose        = require("mongoose");

dotenv.config();

app.set("view engine", "ejs");

//Connecting to database
var mongourl=process.env.MONGO;
mongoose.connect(mongourl, {useNewUrlParser: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Success message when connected to database
db.once('open', function() {
    console.log("Sucessfully connected to database!")
  });

//To be able to use external css
app.use(express.static(__dirname + '/public'));

//User schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

var User = mongoose.model("User", userSchema);

//Pet schema
var petSchema = new mongoose.Schema({
    title: String,
    image: String,
    location: String,
    seller: String,
    price: Number,
});

var Pet = mongoose.model("Pet",petSchema);

// Example data
var petsforsale = [
    {title:"Bull Dog",image:"https://negativespace.co/wp-content/uploads/2018/01/negative-space-bulldog-dog-pet-sleep-couch-thumb-1.jpg",location:"Bangalore",seller:"Chandan",price:"20000"},
    {title:"Labrador",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Chennai",seller:"Vamsi",price:"10000"},
    {title:"Poodle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Delhi",seller:"Abhishek",price:"30000"},
    {title:"Pug",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Mumbai",seller:"Arun",price:"15000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
    {title:"Beagle",image:"https://negativespace.co/wp-content/uploads/2018/08/negative-space-golden-labrador-puppies-dog-happy-field-grass-flowers-chevanon-photography-thumb-1.jpg",location:"Goa",seller:"Akash",price:"25000"},
];

//Getting fontawesome link from env variables
var fontawesome=process.env.FONTAWESOME;

//ROUTES

//Homepage
app.get("/",function(req,res){
    //Get all the pets from database
    Pet.find({},function(err, pets){
        if(err){
            console.log(err);
        }else{
            res.render("homepage",{pets:pets});
        }
    });
    
});

//Signup
app.get("/signup",function(req, res){
    res.render("signup");
});


//Signin
app.get("/signin",function(req, res){
    res.render("signin");
});

//Signup
app.get("/signup", function(req, res){
    res.send("You are on signup page!");
});

//404
app.get("*", function(req, res){
    res.send("Oops! Page not found.");
});

//Port to listen on
port= process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Petexchange app has started");
});