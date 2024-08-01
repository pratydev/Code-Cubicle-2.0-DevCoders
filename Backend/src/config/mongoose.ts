import mongoose from "mongoose";

mongoose.connect('mongodb+srv://jesipa9701:5Neg4LUZaGaywbXS@codecubicle.odcirfa.mongodb.net/');
// mongoose.connect('mongodb://localhost:27017/codecubicle');


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Successfully Connected to the database');
});


export default db;

