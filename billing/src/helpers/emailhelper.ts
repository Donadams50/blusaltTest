import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import dotenv from 'dotenv';

dotenv.config();

export const emailUtility = async (
        emailFrom: any,
        emailTo: string,
        emailSubject: string,
        emailLink: string,
        emailLink2: string,
        text: string,
        fName: string
) => {
        async function wrapedSendMail() {
                return new Promise((resolve, reject) => {
                        const transport = nodemailer.createTransport({
                                host: process.env.mailName,
                                port: 465,
                                secure: true,
                                auth: {
                                        user: process.env.user,
                                        pass: process.env.pass,
                                },
                        });
                        const handlebarsOptions = {
                                viewEngine: {
                                        extName: 'index.handlebars',
                                        partialsDir: './',
                                        layoutsDir: './',
                                        defaultLayout: './src/helpers/index',
                                },
                                viewPath: './src/helpers',
                                extName: '.handlebars',
                        };
                        transport.use('compile', hbs(handlebarsOptions));
                        const mailOptions = {
                                // should be replaced with real  recipient's account
                                from: emailFrom,
                                to: emailTo,
                                subject: emailSubject,
                                text: emailLink,
                                template: 'index',
                                context: {
                                        name: fName,
                                        link: emailLink,
                                        link2: emailLink2,
                                        message: text,
                                },
                        };
                        transport.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                        //   console.log('=======================================yyyyyyy======================')
                                        console.log(error);
                                        reject(error); // or use rejcet(false) but then you will have to handle errors
                                        // return error
                                } else {
                                        //   console.log('=======================================uuuuuuuuu======================')
                                        console.log(`Email sent: ${info.response}`);
                                        resolve(true);
                                }
                        });
                });
        }
        const resp = await wrapedSendMail();
        return resp;
};
    