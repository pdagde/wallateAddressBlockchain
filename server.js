var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    meetupsController = require("./server/controllers/meetups-controller.js");
mongoose.connect('mongodb://localhost:27017/mean-demo');

app.use(bodyParser());

app.get('/',function(req,res){
 res.sendfile(__dirname+'/client/views/index.html');
})
app.use("/js",express.static(__dirname+'/client/js'));

app.get('/api/meetups',meetupsController.list);
app.post('/api/meetups',meetupsController.create);
app.post('/api/search',meetupsController.search);
app.post('/api/searchRegExp',meetupsController.searchRegExp);
 app.post('/api/storeData',meetupsController.storeData);
app.listen(5000,function(){
 console.log("Welcome to Mean.. i m learning on port 5000");
    console.log("type URL on Browser http://localhost:5000/")
})

