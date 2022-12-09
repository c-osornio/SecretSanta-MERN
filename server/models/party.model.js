const mongoose = require('mongoose');
// const User = require('../models/user.model')
var uniqueValidator = require('mongoose-unique-validator');

const SecretSantaSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }
})

const WishlistSchema = new mongoose.Schema({
    list: [
        {
            item: {
                type: String,
                required: [true, "*Wishlist item name is required."],
            },
            details: {
                type: String,
                required: [true, "*Details about your wishlist item is required."],
            },
            image: {
                type: String,
            }
        }
    ]
})

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "*All members are required to have names."],
        minLength: [2, "*Member's name must be at least 2 characters long."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "*All members are required to have emails."],
        match: [ /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "*Invaild email address."], 
        trim: true
    },
    wishlist: {
        type: [WishlistSchema],
    },
    secretSanta: {
        type: String
    }
})

const PartySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "*Title is required."],
        minLength: [2, "*Title must be at least 2 characters long"],
        trim: true,
    },
    members: {
        type: [MemberSchema],
        required: [true, "*There must be at least 3 members per party."],
        validate:{
            validator:function(v){
                console.log(v.length)
                if(v.length < 3){
                    return false
                }
            },
            message: "*There must be at least 3 members per party."
        }
    },
    date: {
        type: Date,
        required: [true, "*Date is required."],
        min: [Date.now(), "*Date must be in the future."]
        // validate: function(input) {
        //     return typeof new Date(input) === 'date' && new Date(input) >= new Date();
        // }, message: input => `${input} must be greater than or equal to the current date!`
    },
    location: {
        type: String,
        required: [true, "*Location is required."],
        trim: true,
    },
    budget: {
        type: Number,
        required: [true, "*Budget is required."],
        trim: true,
    },
    createdBy: {
        type: String,
    }
}, 
{timestamps: true }
)

const Party = mongoose.model("Party", PartySchema)

PartySchema.plugin(uniqueValidator, { message: '*Sorry, "{VALUE}" is already in use.' });

module.exports = Party;


// type: mongoose.Schema.Types.ObjectId,
// ref: "User"