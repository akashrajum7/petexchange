const express= require("express"),
      app    = express();

app.listen(process.env.PORT, () => {
    console.log(`Petexchange app has started`);
});