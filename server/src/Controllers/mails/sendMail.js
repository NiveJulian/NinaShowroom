const dotenv = require("dotenv");
const transporter = require("../../Helpers/mailer");
dotenv.config();

const sendMailUser = async (to, subject, message) => {
  const mailOptions = {
    from: '"Nina Showroom" <no-reply@techwebstudio.com>', // Dirección que se mostrará en el correo
    to: to,
    subject: subject,
    html: message,
    envelope: {
      from: 'no-reply@techwebstudio.com', // Dirección real del emisor
      to: to,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    console.error('Error al enviar el email: ' + error);
  }
};

module.exports = sendMailUser;
  