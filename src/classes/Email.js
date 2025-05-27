// Import the Nodemailer library
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

export async function sendEmailInstructions(email) {
    const token = jwt.sign({ email: email, purpose: 'password_reset_init' }, process.env.JWT_ACCESS_SECRET, { expiresIn: '20m' }); // * purpose -> claim personalidaso (proposito / uso de token)
    // * Añadimos el campo email para verificar que el token pertenece al usuario en futuros metodos (sendVerificationCode)
    const url = `${process.env.APP_URL_FRONT}/auth/email-verified?token=${token}`

    // Configure the mailoptions object
    const mailOptions = {
      from: 'ERP System <no-reply>@erpsystem.com',
      to: email,
      subject: 'Recuperar contraseña',
      html: ` <p> Hola, has solicitado restablecer tu cuenta en ERP System. </p>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${url}">Click aquí</a>
      <p>Este enlace expirará en 20 min.</p>
      <p>Si tu no solicitaste esta cuenta, favor de ignorar el mensaje</p>
    `
    };
    // Send the email
    await transporter.sendMail(mailOptions);
}

export async function sendVerificationCode(email, code) {
    const mailOptions = {
        from: 'ERP System <no-reply>@erpsystem.com',
        to: email,
        subject: 'Codigo de verificación',
        html: ` <p> Hola, has solicitado restablecer tu contraseña en ERP System. </p>
        <p>Tu código de verificación es: <strong>${code}</strong> </p>
        <p>Este enlace expirará en 15 min.</p>
        <p>Si tu no solicitaste esta cuenta, favor de ignorar el mensaje</p>
      `
      };
    // Send the email
    await transporter.sendMail(mailOptions);
}