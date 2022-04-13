// starting a server
// make a new folder first
// in folder run the command 'npm init' on terminal to initialize as a node module
// then change the main to 'server.js' in the package.json
// install bodyparser and mongoose (npm install mongoose and npm install body-parser)
// install nodemon: npm install nodemon
// now you are ready to start
// how to import them? use require!
const express = require('express') // importing express library
const app = express() // using app to represent the express library, can call app with express methods

const cors = require('cors');
app.use(cors())

// to enable use of body parser
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
    extended: true
}));

// to deploy to Heroku
// changed because port 5000 might not be avaible, so Heroku can select one from environment
app.listen(process.env.PORT || 5000, function (err) {
    if (err) {
        console.log(err);
    }
})

// app.get('/', function (req, res) { // use res to send a response back to the server
//     // this is how you construct it
//     res.sendFile(__dirname + "/index.html"); // send the whole file to the '/' at port 5000
//     })

// app.get('/code.js', function (req, res) { // use res to send a response back to the server
//     // this is how you construct it
//     res.sendFile(__dirname + "/code.js"); // send the whole file to the '/' at port 5000
//     })
// index.html relies on code.js, has the script tag which links to it. But if index.html also depends on
// a css file, images folder, etc. To tedious to write a get request for every file
// how to make do this better?

// stores all static content, doesn't change when running. Have to provide a folder path
app.use(express.static("./public"))

// first request: finding a unicorn by name.
// there is a form in the html file
// a input box for entering unicorn name
// how to get the user intput: remember the jQuery stuff
// to get the val: $('#unicornName').val()
// add this stuff to your code.js

// this will only run if the server has recieved a POST request
// in code.js, we are making a POST request and providing a unicorn name
// the url also HAS to match will the url in the ajax post
app.post("/findUnicornByName", function (req, res) {
    console.log("request has been recieved")
    // this is how you get the name, use req.body.(whatever is the name of the key)
    // the key in the ajax POST is called unicornName, so match in the POST request here
    console.log(req.body.unicornName)
    // not it is working, what next?
    // need to get the unicorn that matchs the name
    // have to link a unicorns db in here
    // to access the unicor model
    // then use find, regular mongodb commands to find unicorns with that name
    unicornModel.find({name: req.body.unicornName}, function(err, unicorns){
      if (err){ // if there is an error, console it
        console.log("Error " + err);
      }else{
        console.log("Data "+ unicorns); // else console the unicorn
      }
      // now check the network
      // click on the request
      // go to response, now there is a JSON of the requested unicorn here
      res.send(unicorns);
      // now we have to display the unicorn on the page, do this in code.js
  });

})

// new route for the food filter
app.post("/findUnicornByFood", function (req, res) {
    console.log("request has been recieved")
    // recieved 2 things, the value for appleIsChecked and carrotIsChecked
    console.log(req.body.appleIsChecked) // need a console log ofr both
    console.log(req.body.carrotIsChecked) 

    // then use find, regular mongodb commands to find unicorns with that food

    // to access the unicorn model
    // how to construct it?
    // there may be more than one value, you can select both apple and carrot, there can also be nothing, or one or the other
    // so we need an array, a variable for an array
    food_list = []
    // now we need to add the checked items into this array
    // for that, we need if statement to check if it is checked. If it is checked, we need to push apple or carrot into array
    if (req.body.appleIsChecked == "checked") {
        food_list.push("apple")
    }
    if (req.body.carrotIsChecked == "checked") {
        food_list.push("carrot")
    }
    unicornModel.find({loves: {$all: food_list}}, function(err, unicorns){
      if (err){ // if there is an error, console it
        console.log("Error " + err);
      }else{
        console.log("Data "+ unicorns); // else console the unicorn
      }
      // now check the network
      // click on the request
      // go to response, now there is a JSON of the requested unicorn here
      res.send(unicorns);
      // now we have to display the unicorn on the page, do this in code.js
  });

})

app.post("/findUnicornByWeight", function (req, res) {
    console.log("find by weight called")
    // what if user leaves a field empty?
    // need some if statements to check and do stuff if so
    // when nothing is passed, actually an empty string is passed, not a 'null' value
    weight_filter = {weight: {$gt: req.body.LowerLimit, $lt: req.body.UpperLimit}}
    if (req.body.LowerLimit !== '' && req.body.UpperLimit !== '') {
        weight_filter = {weight: {$gt: req.body.LowerLimit, $lt: req.body.UpperLimit}}
    }

    unicornModel.find(weight_filter, function(err, unicorns){
        if (err){ // if there is an error, console it
          console.log("Error " + err);
        }else{
          console.log("Data "+ unicorns); // else console the unicorn
        }
        // now check the network
        // click on the request
        // go to response, now there is a JSON of the requested unicorn here
        res.send(unicorns);
        // now we have to display the unicorn on the page, do this in code.js
    });

})


// to link our server to the unicorns db, this way we can send the info of requested unicorn
const mongoose = require('mongoose'); // import mongoose library
// connecting to our server on db

mongoose.connect("mongodb+srv://A1exander-liU:assignment3@cluster0.xi03q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
// mongoose.connect("mongodb://localhost:27017/test", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
// defining a model to mock the unicorns db
const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    loves: [String] // means it is an array of strings
});
const unicornModel = mongoose.model("unicorns", unicornSchema);