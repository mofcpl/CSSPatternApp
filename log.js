var colors = require('colors');

module.exports = (type, where, who, what) =>
{
    let temp =  where+": "+who+" - "+what;;
    let msg = "";

    switch (type)
    {
        case "ERROR":
        {
            msg = temp.red;
            break;
        }
        case "WARNING":
        {
            msg = temp.yellow;
            break;
        }
        case "SUCCESS":
        {
            msg = temp.green;
            break;
        }
        case "INFO":
        {
            msg = temp.white;
            break;
        }
        default: break;
    }

    console.log(new Date()+" -- "+msg);
}