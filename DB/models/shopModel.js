const mongoose = require('mongoose')


const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Shop name is required']
    },
    slug: {
        type: String,
        required: [true, 'Shop slug is required'],
        unique: true
    },
    location: {
        type: String,
        required: [true, 'Shop location is required']
    },
    phone : {
        type: String,
        required: [true, 'Shop phone number is required']
    }
});

module.exports = mongoose.model('Shop', shopSchema);