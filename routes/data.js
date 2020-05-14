var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const log = require('../log');

/* GET home page. */
router.get('/', function(req, res, next) {


    
    Users.findOne({sessionCode: req.session.sessionCode}, (err, docs) =>
    {
        if(!docs)
        {
            log("WARNING","dataRouter","Session: ("+req.session.sessionCode+")","there is no such session");
            res.json({error: true});
        }
        else
        {
            log("INFO","dataRouter","Session: ("+req.session.sessionCode+")","succesfully send data");
            res.json({error: false, name: docs.name, email: docs.email, homepage: docs.homepage});
        }
    });
  
});

module.exports = router;