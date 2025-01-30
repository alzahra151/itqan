const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            // port: 587,
            secure: true,
            auth: {
                user: `${process.env.USER}`,
                pass: `${process.env.PASS}`,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: text,
        });

        console.log("تم ارسال الايميل بنجاح");
    } catch (error) {
        console.log(error, "لم يتم ارسال الايميل حاول مرة اخرى");
    }
};

module.exports = sendEmail;