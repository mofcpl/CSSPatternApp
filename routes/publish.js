var express = require('express');
var router = express.Router();

const log = require('../log');
const Users = require('../models/users');
const Projects = require('../models/projects');


/* GET home page. */
router.post('/', function(req, res, next) 
{

    Users.findOne({sessionCode: req.session.sessionCode}, (err, userDocs) =>
    {
        if(!userDocs)
        {
            log("WARNING","publishRouter","User email:("+req.body.email+")","there is no such session");
            res.json({error: true, msg: ["not logged in"]});
        }
        else if(!userDocs.isActive)
        {
            log("WARNING","publishRouter","User email:("+req.body.email+")","account is inactive");
        }
        else
        {
            Projects.find({title: req.body.title}, (err, projectDocs) =>
            {
                
                if(projectDocs.length == 0)
                {
                    const newProject = new Projects(
                        {
                            title: req.body.title,
                            author: userDocs._id,
                            data: req.body.data,
                            style: req.body.style
                        }
                    )

                    newProject.save( (err) =>
                    {
                        if(err)
                        {
                            log("ERROR","publishRouter","User email:("+req.body.email+")",err)
                            res.json({error: true, msg: "unable to add project to database"})
                        }
                        else 
                        {
                            log("SUCCESS","publishRouter","User id:("+req.params.id+")","Project successfully published!");
                            res.json({error: false});
                        }
                    })
   
                }
            });
        }
        
    });
});

module.exports = router;