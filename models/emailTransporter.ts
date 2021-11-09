import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, html: string) => {

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.timeweb.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@budgetim.ru',
        pass: 'JJqsg5Qvnu',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: 'no-reply@budgetim.ru',
      to: email,
      subject: subject,
      html: html,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log('email not sent');
    console.log(error);
  }
};
