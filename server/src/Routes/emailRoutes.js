const { Router } = require("express");
const sendMailUser = require("../Controllers/mails/sendMail");
const emailRoutes = Router();

emailRoutes.post("/", async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    const mail = await sendMailUser(to, subject, message);
    return res.status(200).json(mail);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
});

module.exports = emailRoutes;
