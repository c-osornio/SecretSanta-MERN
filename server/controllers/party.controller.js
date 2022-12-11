const Party= require('../models/party.model')
const jwt = require("jsonwebtoken");


module.exports = {
    create: (req, res) => {
        Party.insertMany(req.body, {forceServerObjectId:true} )
            .then( result => {
                res.status(201).json(result)
            })
            .catch( err => {
                res.status(400).json({ message: 'Something went wrong! (party create)', error: err })
            });
    },
    getAll: (req, res) => {
        Party.find()
            .then( result => {
                res.json(result)
            })
            .catch( err => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    getOne: (req, res) => {
        Party.findOne({ _id: req.params.id })
            .then(result=> {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    update: (req, res) => {
        Party.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then( result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    delete: (req, res) => {
        Party.deleteOne({ _id: req.params.id })
            .then(result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    getMemberFromParty: (req, res)=> {
        Party.findOne({ _id: req.params.id })
        .then(result=> {
            const thisMember =result.members.filter((member)=> {
                member._id === req.params.memberId
            }) [0]
            res.json(thisMember)
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong!', error: err })
        });
            
    }
}