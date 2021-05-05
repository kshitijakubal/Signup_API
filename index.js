const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const signupRoute = require('./routes/signup.route')

// MongoDB Connection 
const mongoURL = "mongodb://127.0.0.1/signup_api"
mongoose.connect(mongoURL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: true
})

// get mongoose to use global promise
mongoose.Promise = global.Promise

const db = mongoose.connection;

// On successful connection
db.on('open',()=>{
    console.log("Mongodb successfully connected");
})
// error connecting database
db.on('Error',(err)=>{
    console.log("Error in Mongodb Connection"+err);
})

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use('/signup',signupRoute);

app.listen(8000,()=>{
    console.log("App is up and running");
})