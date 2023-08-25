
//const mongodb = require('mongodb');

// const mongoURI = process.env.MONGODB_URL;

let mongoose = require('mongoose');
require('dotenv').config();
const { tallySchema } = require('./schema')


mongoose.connect("mongodb+srv://archanasreenivask:covidtally-data@cluster0.kdlvrr9.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        // console.log("error while connection", err)
        console.log("error while connection")
    });
collection_connection = mongoose.model('covidtally', tallySchema)


exports.connection = collection_connection;
