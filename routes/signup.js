var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");

const Users = require('../models/users');
const email = require('../mail');
const log = require('../log');



/* GET home page. */
router.post('/', function(req, res, next) {

    Users.find({email: req.body.email}, async (err, docs) =>
    {
        if(docs.length !== 0)
        {
            log("WARNING","signUpRouter","User email:("+req.body.email+")","email address is already taken")
            res.json({error: true, msg: "email is already taken"});
        }
        else
        {

            const hash = await bcrypt.hash(req.body.password, 10);

            const newUser = new Users(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    isActive: false,
                    activationCode : randomstring.generate(40)
                }
            );

            if(email.sendActivationLink(newUser._id, newUser.activationCode, newUser.email))
            {
                log("ERROR","signUpRouter","User email:("+req.body.email+")","email address is already taken");
                res.json({error: true, msg: "unable to send activation link"})
            }
            else
            {
                
                newUser.save( (err) =>
                {
                    if(err)
                    {
                        log("ERROR","signUpRouter","User email:("+req.body.email+")",err)
                        res.json({error: true, msg: "unable to add user to database"})
                    }
                    else 
                    {
                        log("SUCCESS","activateRouter","User id:("+req.params.id+")","Account successfully registered!");
                        res.json({error: false});
                    }
                })
            }
        }
    })
   
});

module.exports = router;
