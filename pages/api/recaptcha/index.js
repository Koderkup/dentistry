export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await recaptchaVerify(req, res);
      break;
    default:
      break;
  }
};

const recaptchaVerify = async (req, res) => {
  if (req.method === "POST") {
    const { recaptchaResponse } = req.body;
    const secretKey = process.env.REACT_APP_RECAPTCHA_SERVER_KEY;
    const url = "https://www.google.com/recaptcha/api/siteverify";
    const data = {
      secret: secretKey,
      response: recaptchaResponse,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: "Недействительный ответ reCAPTCHA" });
      }
    } catch (error) {
      console.error("Ошибка при проверке reCAPTCHA:", error);
      res.status(500).json({ error: "Ошибка при проверке reCAPTCHA" });
    }
  } else {
    res.status(405).json({ error: "Метод не разрешен" });
  }
};
