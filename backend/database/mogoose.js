const mongoose = require("mongoose");

//To handle asynchronous codes
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb+srv://emre:123654@cluster0.gktxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database is Connected"))
  .catch(error => console.log(error));

module.exports = mongoose;
