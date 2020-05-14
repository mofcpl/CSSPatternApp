var express = require('express');
var router = express.Router();

const log = require('../log');
const Projects = require('../models/projects');
const Users = require('../models/users');


/* GET home page. */
router.post('/', function(req, res, next) 
{

    Users.findOne({sessionCode: req.session.sessionCode}, (err, userDocs) =>
    {
        console.log(req.session.sessionCode);
        if(err)
        {
            log("WARNING","deleteRouter","User email:("+req.body.email+")","there is no such session");
            res.json({error: true, msg: ["not logged in"]});
        }
        else
        {
            Projects.findOne({_id: req.body.projectId}, (err, projectDocs) =>
            {
                
                if(!projectDocs)
                {
                    log("WARNING","deleteRouter","Project id:("+req.body.projectId+")","no project with this id");
                    res.json({error: true, msg: ["project not found"]});
                }
                else
                {

                    if(!projectDocs.author.equals(userDocs._id))
                    {
                        log("WARNING","deleteRouter","Project id:("+req.body.projectId+")","project not belong to user");
                        res.json({error: true, msg: ["this is not you project"]});
                    }
                    else
                    {
                        Projects.deleteOne({_id: req.body.projectId}, (err) =>
                        {
                            
                            if(err)
                            {
                                log("WARNING","deleteRouter","Project id:("+req.body.email+")","can't delete from database");
                                res.json({error: true, msg: err});
                            }
                            else
                            {
                                log("SUCCESS","deleteRouter","Project id:("+req.body.email+")","Project deleted");
                                res.json({error: false});
                            }
                            
                        })
                    }
                }

            });
        }
        
    });


});

module.exports = router;