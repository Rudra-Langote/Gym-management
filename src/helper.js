import nodemailer from 'nodemailer';
import User from './models/userModel';
import { uuid } from 'uuidv4';

export const sendEmail = async ({ email, emailtype, userId }) => {

    try {
        const uuidTocken = uuid();
        if (emailtype === "VERIFY") {

            await User.findByIdAndUpdate(userId,
                { verifiedToken: uuidTocken, verifiedTokenExpire: Date.now() + 3600000 })


        } else if (emailtype === "FORGOT") {
            await User.findByIdAndUpdate(userId,
                { frogotPasswordToken: uuidTocken, forgotPasswordTokenExpire: Date.now() + 1800000 })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b0051cdae03aaa",
                pass: "a2d5c210d66d44"
            }
        });

        const mailOptions = {
            from: 'langoterudra2005@gmail.com',
            to: email,
            subject: emailtype === 'VERIFY' ? "Verify your account" : "Reset your password",
            text: "Hello world?",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${uuidTocken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}<br/> ${process.env.DOMAIN}/verifyemail?token=${uuidTocken}</p>`,
        }
        const info = await transport.sendMail(mailOptions)
        return info

    } catch (error) {
        throw new Error(error.message);
    }
}
