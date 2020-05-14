nodeMailer = require('nodemailer');

config = require('./config')

const sendActivationLink = (id, code, address) =>
{
    let transporter = nodeMailer.createTransport(
    {
        host: config.emailHost,
        port: 465,
        secure: true,
        auth: 
        {
            user: config.emailUser,
            pass: config.emailPassword
        }
    });

    const activationLink = "https://csspatternapp.com/activate/"+id+"/"+code;

    let mailOptions = 
    {
        from: '"CSSPatternApp" <admin@csspatternapp.com>', // sender address
        to: address, // list of receivers
        subject: "Account activation", // Subject line
        //text: req.body.body, // plain text body
        html:` 
            <p>Click the link below to activate your CSSPatternApp account:</p>
            <p><a href="${activationLink}"</a>${activationLink}</p>
            <p>This email was generated automatically! Please do not reply!</p>
            `
    };

    transporter.sendMail(mailOptions, (error, info) => 
    {
        if (error) 
        {
            console.log('Error sending email: '+error);
            return error;
        }
        console.log('Message %s sent: %s', info.messageId, info.response);  
    });
    
    return 0;
}

module.exports = {sendActivationLink};