const e = require('express');
const mongoose = require('mongoose')


const dbConnect = async ()=>{
    const connection = await mongoose.connect(process.env.CONNECTION_STRING)
    if(connection){
        console.log('Database connected successfully');
    }
    else {
        console.log('Database connection failed');
    }
}


module.exports = dbConnect