/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
const my_api_key = process.env.MY_API_KEY;
dbConnect();

export default async (req, res) => {
  const { method } = req;
  let { email, fullname, subject, message } = req.body;

  switch (method) {
    case "POST":
      try {
        if (!email || typeof email !== "string") {
          res
            .status(400)
            .json({ success: false, error: "Merci d'insérer un email valide" });
        }
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(my_api_key);
        const msg = {
          to: process.env.EMAIL,
          from: process.env.EMAIL,
          subject: req.body.subject,
          text: req.body.message,
          html: `<div>
                        <p><strong>FROM: </strong>${req.body.email}</p>
                        <p><strong> DE: </strong>${req.body.fullname}</p>
                        <p><strong>Subject: </strong>${req.body.subject}</p>
                        <p><strong>Message: </strong>${req.body.message}</p>
                    </div>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
        return res.status(200).json({ success: true, message: "Email sended" });
      } catch (error) {
        return res.status(400).json({ success: false, data: "erreur catch" });
      }
    default:
      return res.status(400).json({ success: false, data: "erreur default" });
  }
};
