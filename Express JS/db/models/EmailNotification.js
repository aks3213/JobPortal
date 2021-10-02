var nodemailer = require('nodemailer');
function newEmail(to,sub,msg) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jobportal169@gmail.com',
            pass: 'ypydqziyxhmhwiwc'
        }
    });
    var mailOptions = {
        from: 'jobportal169@gmail.com',
        to: to,
        // cc:cc,
        subject: sub,
        text: msg+'\n\n\nFrom\nJob Portal'
    };    
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('newEmail sent: ' + info.response);
            }
        });
   

   
}
module.exports = newEmail