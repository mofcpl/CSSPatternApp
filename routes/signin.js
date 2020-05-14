var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");

const Users = require('../models/users');
const log = require('../log');

/* GET home page. */
router.post('/', (req, res) =>
{
    
    Users.findOne({email: req.body.email},async (err, docs) =>
    {
        if(!docs)
        {
            log("WARNING","signInRouter","User email:("+req.body.email+")","no user with this email");
            res.json({error: true, msg: "incorrect password or login"});
        }
        else
        {
            const match = await bcrypt.compare(req.body.password, docs.password);

            if(match)
            {
                const sessionCode = randomstring.generate(20);
                docs.sessionCode = sessionCode;
                req.session.sessionCode = sessionCode;
                docs.save();
                log("SUCCESS","signInRouter","User email:("+req.body.email+")","successfully logged in");
                res.json({error: false, name: docs.name});
            }
            else
            {
                log("WARNING","signInRouter","User email:("+req.body.email+")","incorrect password");
                res.json({error: true, msg: "incorrect password or login"});
            }

        }
    });
});

module.exports = router;