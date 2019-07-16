//Initialization
const express         = require("express"),
      app             = express(),
      dotenv          = require("dotenv"),
      mongoose        = require("mongoose"),
      passport        = require("passport"),
      LocalStrategy   = require("passport-local"),
      bodyParser      = require("body-parser");

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
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
    price: Number,
});

var Pet = mongoose.model("Pet",petSchema);

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

//Post
app.get("/post",function(req,res){
    res.render("post");
});

//Signin
app.get("/signin",function(req, res){
    res.render("signin");
});

//Signup
app.get("/signup",function(req, res){
    res.render("signup");
});

app.post("/signup", function(req,res){

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