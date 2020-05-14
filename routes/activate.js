var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const log = require('../log');

const errorMessage = "The activation link has expired or is invalid!";

/* GET home page. */
router.get('/:id/:code', function(req, res, next) 
{
    Users.findOne({_id: req.params.id}, async (err, docs) =>
    {
        if(!docs)
        {
            log("WARNING","activateRouter","User id:("+req.params.id+")", " there is no such user");
            res.send(errorMessage);
        }
        else
        {
            if(docs.isActive === true)
            {
                log("WARNING","activateRouter","User id:("+req.params.id+")", " account is already active");
                res.send(errorMessage);
            }
            else
            {
                if(docs.activationCode != req.params.code)
                {
                    log("WARNING","activateRouter","User id:("+req.params.id+")"," activation code is incorrect");
                    res.send(errorMessage);
                }
                else
                {
                    docs.isActive = true;
                    docs.save( (err) =>
                    {
                        if (err)
                        {
                            log("ERROR","activateRouter","User id:("+req.params.id+")",err);
                            res.send(errorMessage);
                        }
                        else
                        {
                            log("SUCCESS","activateRouter","User id:("+req.params.id+")","Account successfully activated!");
                            res.send("Activation succesfull!");
                        }

                    });
                }
            }  

        }
    
    });
});

module.exports = router;
