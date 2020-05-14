var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");

const Users = require('../models/users');
const log = require('../log');
const email = require('../mail');

/* GET home page. */
router.post('/', function(req, res, next) {


    
    Users.findOne({sessionCode: req.session.sessionCode}, async (err, docs) =>
    {
        if(!docs)
        {
            log("WARNING","dataRouter","User email:("+req.body.email+")","there is no such session");
            res.json({error: true, msg: ["not logged in"]});
        }
        else
        {

            const match = await bcrypt.compare(req.body.password, docs.password);
            if(!match)
            {
                log("WARNING","updateRouter","User email:("+req.body.email+")","wrong password");
                res.json({error: true, msg: ["Wrong password"]});
            }
            else
            {
                let emailError = false;
                let emailChange = false;

                if(docs.name !== req.body.name) docs.name = req.body.name;
                if(docs.homepage !== req.body.homepage) docs.homepage = req.body.homepage;
                if(req.body.newPassword) docs.password = await bcrypt.hash(req.body.newPassword, 10);
                if(docs.email !== req.body.email)
                {
                    let activationCode = randomstring.generate(40);
                    emailChange = true;
                    
                    if(email.sendActivationLink(docs._id, activationCode, req.body.email))
                    {
                        log("ERROR","updateRouter","User new email:("+req.body.newPassword+")","can't send email");
                    }
                    else
                    {
                        docs.email = req.body.email;
                        docs.isActive = false;
                        docs.activationCode = activationCode;
                    }
                    
                }

                docs.save( (err) =>
                {
                    if(err)
                    {
                        log("ERROR","updateRouter","User email:("+req.body.email+")",err)
                        res.json({error: true, msg: "unable to add user to database", emailError, emailChange})
                    }
                    else 
                    {
                        log("SUCCESS","activateRouter","User id:("+req.params.id+")","Account successfully updated");
                        res.json({error: false, emailError, emailChange});
                    }

                })

            }
            
        }
    });
  
});

module.exports = router;