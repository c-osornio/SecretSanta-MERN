const mongoose = require('mongoose');
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
                required: [true, "*A name for your item is required."],
            },
            details: {
                type: String,
                required: [true, "*A link for your item is required."],
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