var express = require('express');
var router = express.Router();

const log = require('../log');
const Projects = require('../models/projects');


/* GET home page. */
router.get('/', function(req, res, next) 
{

    Projects.find({}, (err, projectDocs) =>
    {
        if(projectDocs.length != 0)
        {
            const tempArray = projectDocs.map( (currentValue, index, array) =>
            {
                return {title: currentValue.title, style: currentValue.style, id: currentValue._id, publishedDate: currentValue.publishedDate, downloads: currentValue.downloads}
            })
            
            res.json({projects: tempArray, error: false});
        }
    });

});

module.exports = router;