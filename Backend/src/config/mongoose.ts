import mongoose from "mongoose";

if(process.env.CODECUBICLE_DB_URL){
    mongoose.connect(process.env.CODECUBICLE_DB_URL);
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Successfully Connected to the database');
});


export default db;

