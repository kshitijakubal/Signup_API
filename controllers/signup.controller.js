const mongoose = require("mongoose")
const Signup = require('../models/signup.model')
// For storing hash password
const bcrypt = require('bcrypt');

exports.post_signup = (req,res) => {
    Signup.find({email:req.body.email}).exec()
    .then(user =>{
        if(user.length >= 1){
            // 409 means conflict
            // 422 means unprocessable entity
            res.status(409).json({
                message:'Mail exists'
            })
        }
        else{
            // 10 is the salting value
            bcrypt.hash(req.body.password,10, (err,hash) => {
                if(err) {
                    res.status(500).json({
                        error:"Error"+err
                    })
                    
                }
                else{
                    const signup = new Signup({
                        _id: new mongoose.Types.ObjectId,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash
                    });
                signup.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                    message: "Signup Successful",
                     })
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
        }
    })
}
      

exports.get_all_users = (req,res) => {
    Signup.find()
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            users: result.map(res=> {
                return {
                    _id:res._id,
                    name: res.firstname +" "+ res.lastname,
                    email: res.email,
                }
                    
            })
        }
        console.log(result);
        res.status(200).json({response})
    })
    .catch(err => {
        console.log("Error while fetching");
        res.status(500).json({
            error:err
        })
    })
}

exports.get_user_details = (req,res) => {
    const id = req.params.id;
    Signup.findById(id)
    .exec()
    .then(result => {
        res.status(200).json({
            user: result
        })
        
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })

}