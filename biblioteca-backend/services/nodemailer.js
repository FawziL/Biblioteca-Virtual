import nodemailer from 'nodemailer';
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

export default transporter;
