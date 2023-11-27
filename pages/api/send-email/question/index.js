import nodemailer from "nodemailer";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      handler(req, res);
      break;
  }
};
function handler(req, res) {
  const { name, email, text } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SMPT,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SMPT,
    to: process.env.EMAIL_RECIEPIENT,
    subject: "Добрый день у меня к вам вопрос",
    text: `${req.body.name}, ${req.body.email}, ${req.body.text}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      res.status(200).json({ message: "Сообщение отправлено успешно!" });
    }
  });
}
