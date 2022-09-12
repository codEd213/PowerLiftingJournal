const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/journal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established connection to database"))
  .catch((err) => console.log("Something went wrong connecting to database"));
