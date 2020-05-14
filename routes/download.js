var express = require('express');
var router = express.Router();

const log = require('../log');
const Projects = require('../models/projects');
const Users = require('../models/users');


/* GET home page. */
router.post('/', function(req, res, next) 
{

    Projects.findOne({_id: req.body.id}, (err, projectDocs) =>
    {
        projectDocs.downloads += 1;
        
        projectDocs.save( (err) =>
        {
            if(err)
            {
                log("ERROR","downloadRouter","User id:("+req.body.id+")",err)
            }
            else 
            {
                log("SUCCESS","downloadRouter","User id:("+req.params.id+")","Account successfully updated");
            }
        })

        Users.findOne({_id: projectDocs.author}, (err, userDocs) =>
        {
            if(projectDocs.length != 0)
            {       
                res.json({project: projectDocs, author: userDocs, error: false});
            }
        })
        

    });

});

module.exports = router;