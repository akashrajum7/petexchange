//Initialization

const express= require("express"),
      app    = express();

app.set("view engine", "ejs");

//Routes

app.get("/",function(req,res){
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
    ]
    res.render("homepage",{petsforsale:petsforsale});
});

//Port to listen on
port= process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Petexchange app has started");
});

