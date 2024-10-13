import nodemailer from 'nodemailer'
export const sendEmailForPaymentSuccess = async ({ email, customerName, membershipDuration, amount, paymentDate, transactionId, startDate, endDate }) => {




    try {
        const stDate = new Date(startDate);
        const enDate = new Date(endDate);
        const paDate = new Date(paymentDate);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Asia/Kolkata",
            hour12: true,
        };
        const strtDate = stDate.toLocaleString("en-IN", options);
        const edDate = enDate.toLocaleString("en-IN", options);
        const payDate = paDate.toLocaleString("en-IN", options);

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: 'langoterudra2005@gmail.com',
            to: email,
            subject: "Payment Success",
            text: "Hello world?",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #ffcc00;">RK Fitness</h2>
                    <h3>Dear ${customerName},</h3>
                    <p>Thank you for your recent purchase with <b>RK Fitness</b>! We're thrilled to have you as a valued member of our gym.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    
                    <h4>Payment Details:</h4>
                    <ul>
                        <li><b>Duration</b>: ${membershipDuration} months</li>
                        <li><b>Amount Paid</b>: ₹${amount}</li>
                        <li><b>Payment Date</b>: ${payDate}</li>
                        <li><b>Transaction ID</b>: ${transactionId}</li>
                    </ul>
                    
                    <h4>Membership Period:</h4>
                    <ul>
                        <li><b>Start Date</b>: ${strtDate}</li>
                        <li><b>End Date</b>: ${edDate}</li>
                    </ul>
                    
                    <p>If you have any questions or require assistance, feel free to contact us at <a href="mailto:support@rkfitness.com">support@rkfitness.com</a> or call us at +91-1234567890.</p>
                    
                    <p>Thank you once again for choosing <b>RK Fitness</b>. We look forward to helping you achieve your fitness goals!</p>
                    <br />
                    <p>Best Regards,<br /><b>RK Fitness Team</b><br /><a href="http://www.rkfitness.com">www.rkfitness.com</a></p>
                </div>
            </div>
            `,
        }
        const info = await transport.sendMail(mailOptions)
        return info

    } catch (error) {
        console.log(error)

        // throw new Error(error.message);
    }
}