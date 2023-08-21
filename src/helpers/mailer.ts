import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    /* -------------------------------------------------------------------------- */
    //NOTE: create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // console.log(hashedToken)

    /* -------------------------------------------------------------------------- */
    //NOTE: Email Context
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    /* -------------------------------------------------------------------------- */
    //NOTE: Create mail transporter
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,

        //TODO: add these to credential to .env file
      },
    });

    /* -------------------------------------------------------------------------- */
    //NOTE: Create mail options
    const mailOptions = {
      from: "olamide.thinker@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      //NOTE - redirect the user to /verifyemail route via a link embed.
      html: `<p>Hi ${email.split("@")[0]}</p>
    <p>Click <a href="${
      emailType === "VERIFY" 
      ?`${process.env.DOMAIN}/verifyemail?token=${hashedToken}` 
      :`${process.env.DOMAIN}/resetpassword?token=${hashedToken}` 
    }">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
    or copy and paste the link below into your browser</p> <br/>
    <i><a href="${
      emailType === "VERIFY" 
      ?`${process.env.DOMAIN}/verifyemail?token=${hashedToken}` 
      :`{process.env.DOMAIN}/resetpassword?token=${hashedToken}` 
    }">${
      emailType === "VERIFY" 
      ?`${process.env.DOMAIN}/verifyemail?token=${hashedToken}` 
      :`${process.env.DOMAIN}/resetpassword?token=${hashedToken}` 
    }</a></i>
    <p>
    `,
    };

    /* -------------------------------------------------------------------------- */
    //NOTE: Send the mail
    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
