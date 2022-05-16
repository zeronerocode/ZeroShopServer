const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const sendEmail = async(email)=>{
    try {
        
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,// true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER, // generated ethereal user
          pass: process.env.MAIL_PASS, // generated ethereal password
        },
      });
      const token = jwt.sign({email:email}, 'emaildskf233r',{
        expiresIn: '24h'
      })
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"ZeroShop " <zeronerocode@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "aktivasi user", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                .container{
                    margin-left: auto;
                    margin-right: auto;
                    width: 300px;
                    height: 100px;
                    border-radius: 10px;
                    background-color: red;
                    margin-top: 20px;
                    padding-top: 100px;
                }
                .container a{
                    text-align: center;
                    display: block;
                    color: yellow;
                    background-color: blue;
                    width: 100%;
                    padding: 10px 0px 10px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <a href="http://localhost:4000/user/active/${token}">klik aktif</a>
            </div>
        </body>
        </html>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    sendEmail
}