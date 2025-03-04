import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.APP_PASS,
    },
  });

  const from = 'contact@rishiyaduwanshi.me'

  try {
    await transporter.sendMail({
      from: `HospitalHub <${from}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("Error in sending email: ", error);
  }
};

export default sendEmail;
