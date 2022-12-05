const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const WishlistSchema = new mongoose.Schema({
    list: [
        {
            item: {
                type: String,
                required: [true, "*Item name is required."],
            },
            description: {
                type: String,
                required: [true, "*Description is required."],
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
        required: [true, "*Member's name is required."],
        minLength: [2, "*Member's name must be at least 2 characters long."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "*Email is required."],
        match: [ /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "*Invaild email address."], 
        trim: true,
    },
    wishlist: {
        type: [WishlistSchema],
    }
})

const PartySchema = new mongoose.Schema({
    admin: {
        type: Boolean
    },
    title: {
        type: String,
        required: [true, "*Title is required."],
        minLength: [2, "*Title must be at least 2 characters long"],
        trim: true,
    },
    members: {
        type: [MemberSchema],
        required: [true, "*Members are required."],
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
    }
}, 
{timestamps: true }
)

const Party = mongoose.model("Party", PartySchema)

PartySchema.plugin(uniqueValidator, { message: '*Sorry, "{VALUE}" is already taken by another member.' });

module.exports = Party;