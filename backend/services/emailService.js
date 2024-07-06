const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marcosmolmedo@gmail.com',
        pass: 'your-email-password',
    },
});

exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to,
            subject,
            text,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};
