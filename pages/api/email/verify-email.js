/* eslint-disable import/no-anonymous-default-export */
// Fonctionnalité destinée à faire une vérification de l'email lors du regsiter mais non terminée et donc non mise en place.
// pour un futur dévéloppement

const MY_API_KEY = process.env.MY_API_KEY;

export default async (req, res) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(MY_API_KEY);
  const msg = {
    to: "olivier.buttner@epitech.eu",
    from: "coding.academy.bdx@gmail.com",
    subject: "sending my 1st mail",
    text: "I hope ...",
    //  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
};
