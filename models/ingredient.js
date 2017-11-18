'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ingredientSchema = new Schema({
    name  : {
        type    : String,
        required: true,
        unique  : true
    },
    weight: {
        type    : String,
        required: true
    },
    price : {
        type    : String,
        required: true
    }
});

const Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports = Ingredient;