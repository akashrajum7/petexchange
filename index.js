//Initialization
const express               = require("express"),
      app                   = express(),
      dotenv                = require("dotenv"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      Pet                   = require("./models/pet"),
      User                  = require("./models/user"),
      bodyParser            = require("body-parser"),
      flash                 = require("connect-flash");

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(flash());

//Connecting to database
var mongourl=process.env.MONGO;
mongoose.connect(mongourl, {useNewUrlParser: true,useCreateIndex: true});

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

//Passport configuration
app.use(require("express-session")({
    secret: "process.env.SECRET",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Getting fontawesome link from env variables
var fontawesome=process.env.FONTAWESOME;

//Function to pass current user to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Funciton to send success or failure to all routes
app.use(function(req,res,next){
    res.locals.error                = req.flash("error");
    res.locals.successfulllogout    = req.flash("successfulllogout");
    res.locals.success              = req.flash("success");
    res.locals.successfullsignup    = req.flash("successfullsignup");
    res.locals.loginrequired        = req.flash("loginrequired");
    next();
})

//ROUTES

//Homepage
app.get("/",function(req,res){
    //Get all the pets from database
    Pet.find({}).populate("user").exec(function(err, pets){
        if(err){
            console.log(err);
        }else{
            //Render the page
            res.render("homepage",{
                pets: pets,
            });
        }
    });
});

//Adoption page

app.get("/shop", function(req, res){
    //Get all the pets from database
    Pet.find({}).populate("user").exec(function(err, pets){
        if(err){
            console.log(err);
        }else{
            //Render the page
            res.render("shop",{pets: pets});
        }
    });
});

//Post a new ad
app.get("/new", isLoggedIn,function(req,res){
    res.render("new");
});

app.post("/new", isLoggedIn,function(req, res){
    //Get details from form
    var title = req.body.title,
        imageurl = req.body.imageurl,
        discription = req.body.discription,
        location = req.body.location,
        price = req.body.price,
        user =req.user;

    //Create a new pet object
    var newPet = {
        title: title,
        imageurl: imageurl, 
        discription: discription,
        location: location,
        price: price,
        user: user
     };

     //Push the object to database
     Pet.create(newPet, function(err, newlyCreatedPet){
        if(err){
            res.send(err);
        } else{
            //Checking to see if the pet is posted in adoption or it's an ad
            if(newlyCreatedPet.price == 0){
                //Look for the user creating the post
                User.findOne({username: req.user.username}, function(err, foundUser){
                    if(err){
                        res.send(err);
                    } else {
                        //Add the pet posted to user's list of ads
                        foundUser.ads.push(newlyCreatedPet);
                        foundUser.save(function(err, adPushedToUser){
                            if(err){
                                res.send(err);
                            } else {
                                req.flash("success","Your post has been successfully posetd.");
                                res.redirect("/");
                            }
                        });
                        
                    }
                });
            } else {
                User.findOne({username: req.user.username}, function(err, foundUser){
                    if(err){
                        res.send(err);
                    } else {
                        //Add the pet posted to user's list of ads
                        foundUser.ads.push(newlyCreatedPet);
                        foundUser.save(function(err, adPushedToUser){
                            if(err){
                                res.send(err);
                            } else {
                                req.flash("success","Your post has been successfully posted.");
                                res.redirect("/shop");
                            }
                        });
                        
                    }
                });
            }            
        }
     });
});

//View ad page
app.get("/pets/:id", isLoggedIn, function(req, res){
    //Get the pet from database
    Pet.findById(req.params.id).populate("user").exec(function(err, foundPet){
        if(err){
            console.log(err);
        } else {
            res.render("pet",{pet: foundPet});
        }
    });
    
});

//User's profile page
app.get("/user/:id", isLoggedIn, isSameUser, function(req, res){
    res.send("This will soon be profile page.");
});

//AUTH ROUTES

//Signin
app.get("/signin",function(req, res){
    res.render("signin");
});

app.post("/signin", passport.authenticate("local",
{
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
    successFlash: "You have successfully logged in."
}),function(req, res){
});

//Signup
app.get("/signup",function(req, res){
    res.render("signup");
});

app.post("/signup", function(req,res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", "Signup failed, Please check your details.")
            res.redirect('/signup');
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("successfullsignup","You have been successfully signed up.");
            res.redirect("/");
        });
    });
});

//Logout route
app.get("/logout", function(req, res){
    req.logout();
    req.flash("successfulllogout","You have been successfully logged out.");
    res.redirect("/");
});

//404
app.get("*", function(req, res){
    res.send("Oops! Page not found.");
});

//Login middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("loginrequired","Please login first.");
    res.redirect("/signin");
}

//Check if the user is the same middleware
function isSameUser(req, res, next){
    if(req.params.id == req.user._id){
        return next();
    }
    req.flash("loginrequired","Please login as the user first");
    res.redirect("/signin");
}

//Port to listen on
port= process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Petexchange app has started");
});