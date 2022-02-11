/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET;
const MY_API_KEY = process.env.MY_API_KEY;

dbConnect();

const sgMail = require("@sendgrid/mail");

export default async (req, res) => {
  const { method } = req;
  let { email } = req.body;

  switch (method) {
    case "POST":
      try {
        if (!email || typeof email !== "string") {
          res
            .status(400)
            .json({ success: false, error: "Merci d'insérer un email valide" });
        }
        let user = await User.findOne({ email }).lean();

        if (!user) {
          return res
            .status(400)
            .json({ success: false, error: "email non reconnu" });
        }

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "600s" });

        sgMail.setApiKey(MY_API_KEY);
        const msg = {
          to: email,
          from: process.env.EMAIL,
          subject: "Mot de passe oublié",
          html: `<div><p>Voici le lien pour ré-initialiser votre mot de passe. Celui-ci est valable durant 10 minutes</p><a href="http://localhost:3000/password/${token}">Ré-initialiser votre mot de passe</a></div>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
        return res.status(200).json({ message: "Email sended" });
      } catch (error) {
        return res.status(400).json({ success: false, data: "erreur catch" });
      }

    default:
      return res.status(400).json({ success: false, data: "erreur default" });
  }
};
