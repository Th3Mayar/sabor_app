import nodemailer from "nodemailer";
import dotenv from "dotenv";

export async function sendResetEmail(email, resetUrl) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "saborapp8@gmail.com",
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });
}
