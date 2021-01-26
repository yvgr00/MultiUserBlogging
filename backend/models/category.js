const mongoose = require('mongoose');


const { timeStamp } = require('console');

const categorySchema = new mongoose.Schema({

   

    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },

    slug: {
        type: String,
        unique: true,
        index: true
    }

}, {timeStamp:true});



module.exports = mongoose.model('Category',categorySchema);