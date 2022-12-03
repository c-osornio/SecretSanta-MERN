const User= require('../models/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

module.exports = {
    getOne: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(result=> {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    getAll: (req, res) => {
        User.find()
            .then( result => {
                res.json(result)
            })
            .catch( err => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    update: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then( result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    delete: (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(404).json({ message: 'Something went wrong!', error: err })
            });
    },
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "Registration successful!", user: user });
            })
            .catch(err => res.json(err));
    },
    login: (req, res) => {
        User.findOne({email:req.body.email})
        .then((user)=>{
            const {_id,firstName,...other} = user
            if(user === null) {
                res.status(400);
            }
            bcrypt.compare(req.body.password,user.password)
            .then(()=>{
                const userToken = jwt.sign({
                    id:user._id,
                    firstName:user.firstName
                }, process.env.SECRET_KEY)
                res.cookie('usertoken',userToken,{
                    httpOnly:true
                }).json({user:{id:_id,name:firstName}})
            })
            .catch(()=>{
                res.status(400)
            })
        })
        .catch((err)=>{
            res.status(400).json({msg:"Something went wrong",error:err})
        })
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.status(200).json({user:"Logged Out"})
    }
}