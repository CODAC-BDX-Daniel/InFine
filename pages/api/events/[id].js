import dbConnect from "../../../utils/dbConnect";
import Event from "../../../models/Event";
import User from "../../../models/User";
import Comment from "../../../models/Comment";
import Booking from "../../../models/Booking";
import jwt from "jsonwebtoken";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const event = await Event.findById(id)
          .populate("users")
          .populate("comments");

        const nb = event.notes.length;
        let sum = 0;
        event.notes.forEach((elem) => {
          sum += elem.note;
        });

        const moyenne = sum / nb;

        if (!event) {
          return res.status(400).json({ success: false, error: error.message });
        }

        res.status(200).json({
          success: true,
          data: { event: event, moyenne: Math.trunc(moyenne), nb: nb },
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST": // Noter un evenement par un user Connecte (Bearer TOKEN)
      try {
        const token = req.headers.authorization;

        const connecte = jwt.decode(token, process.env.JWT_SECRET);
        const event = await Event.findById(id);
        const resultat = JSON.parse(req.body);

        const note = {
          note: resultat.note,
          user_id: connecte.id,
        };
        event.notes.forEach((element) => {
          if (element.user_id === note.user_id) {
            throw "error";
          }
        });
        const e = await Event.findByIdAndUpdate(id, {
          $push: { notes: note },
        });

        res.status(200).json({ success: true, data: "Note add" });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: "Vous avez déja noté l'evenement" });
      }
      break;
    case "PUT":
      try {
        const event = await Event.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!event) {
          return res.status(400).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true, data: event });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        await User.updateMany(
          {},
          {
            $pullAll: {
              myEvents: [{ _id: id }],
            },
          }
        );
        await Booking.deleteMany({ event: { _id: id } });
        await Comment.deleteMany({ event: { _id: id } });

        if (!deletedEvent) {
          return res.status(400).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
};
