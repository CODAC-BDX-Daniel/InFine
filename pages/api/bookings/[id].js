import dbConnect from "../../../utils/dbConnect";
import Booking from "../../../models/Booking";
import User from "../../../models/User";
import Event from "../../../models/Event";
import jwt from "jsonwebtoken";

const MY_API_KEY = process.env.MY_API_KEY;

dbConnect();

const sgMail = require("@sendgrid/mail");

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const booking = await Booking.findById(id)
          .populate("user")
          .populate("event");

        if (!booking) {
          throw "Booking not found in the base";
        }
        res.status(200).json({ success: true, data: booking });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "POST":
      try {
        const token = req.headers.authorization;
        const connecte = jwt.decode(token, process.env.JWT_SECRET);
        const book = {
          event: id,
          user: connecte.id,
        };

        const user = await User.findById(book.user);
        const event = await Event.findById(book.event);
        if (!user || !event) {
          return res
            .status(400)
            .json({ success: false, error: "ERROR : booking not add" });
        } else {
          await Booking.create(book);
          user.myEvents.push(book.event);
          event.users.push(book.user);
          user.save();
          event.save();

          const sgMail = require("@sendgrid/mail");
          sgMail.setApiKey(MY_API_KEY);
          const msg = {
            to: user.email,
            from: process.env.EMAIL,
            subject: "Votre réservation InFine !",
            html: `<div>
                        <p><strong>Bonjour ${user.username}, </strong></p>
                        <p>Votre réservation pour ${event.title} est faite. RDV le ${event.date} à l'adresse ${event.address}</p>
                        <p>Amusez vous bien ! Rdv sur notre site pour voir l'itinéraire, noter ou donnez votre avis.</p>
                        <p>InFine et la communauté vous remercie. <a href="http://localhost:3000/">InFine</a></p>
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

          return res
            .status(201)
            .json({ success: true, booking: "booking add" });
        }
      } catch (error) {
        res.status(401).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const token = req.headers.authorization;
        const connecte = jwt.decode(token, process.env.JWT_SECRET);

        const deletedBooking = await Booking.findOneAndDelete({
          user: connecte.id,
          event: id,
        });

        await User.updateMany(
          {},
          { $pullAll: { myEvents: [{ _id: deletedBooking.event }] } }
        );
        await Event.updateMany(
          {},
          { $pullAll: { users: [{ _id: deletedBooking.user }] } }
        );
        if (!deletedBooking) {
          return res.status(400).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true, message: "booking effacé" });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
};
