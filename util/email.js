import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config()

const sendEmail = async ({to, subject, html}) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY)
    const mail = {
        to,
        from: process.env.SENDGRID_USER,
        subject,
        html
    }
    // const sending = await sgMail.send(mail)
    // console.log(sending);
    await sgMail.send(mail)
    
}

const VerificationEmail = async ({ name, email, verificationToken, origin }) => {
    const verifyLink = `${origin}/auth//verifyEmail?token=${verificationToken}&email=${email}`
    const emailBody = `<p>Dear ${name}, please verify you email by clicking the following link: <a href=${verifyLink}>Verification Link</a></p>`
    console.log(verifyLink);
    return sendEmail({to: email, subject: "xProject: Verify your email", html: emailBody})
    
}

export {VerificationEmail}