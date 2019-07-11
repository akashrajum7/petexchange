//Initialization

const express= require("express"),
      app    = express();

app.set("view engine", "ejs");

//Routes

app.get("/",function(req,res){res.render("homepage");});

//Port to listen on
port= process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Petexchange app has started`);
});