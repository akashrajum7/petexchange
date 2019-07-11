//Initialization

const express= require("express"),
      app    = express();

//Routes

app.get("/",(req,res)=>res.send("You are on root"));

//Port to listen on
port= process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Petexchange app has started`);
});