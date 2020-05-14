var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const log = require('../log');

/* GET home page. */
router.post('/', function(req, res, next) {


    
    Users.findOne({sessionCode: req.session.sessionCode}, (err, docs) =>
    {
        if(docs.length === 0)
        {
            log("WARNING","signOutRouter","Session: ("+req.session.sessionCode+")","there is no such session");
        }
        else
        {
            docs.sessionCode = "";
            log("SUCCESS","signOutRouter","Session: ("+req.session.sessionCode+")","logged out successfully");
            req.session = null;
        }
    });
  
});

module.exports = router;
