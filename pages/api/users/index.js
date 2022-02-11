import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

import jwt from "jsonwebtoken";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const chaine = req.headers.authorization;
        const token = chaine.split(" ")[1];
        const connecte = jwt.decode(token, process.env.JWT_SECRET);

        if (connecte.role !== "admin" || token == null) {
          res
            .status(403)
            .json({
              success: false,
              message: "vous ne pouvez pas accèder à ces informations",
            });
        } else {
          const users = await User.find({})
            .populate("myEvents")
            .populate("myComments");

          res.status(200).json({ success: true, data: users });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const user = await User.create(req.body);

        const chaine = req.headers.authorization;
        const token = chaine.split(" ")[1];
        const connecte = jwt.decode(token, process.env.JWT_SECRET);

        if (connecte.role !== "admin") {
          res
            .status(403)
            .json({
              success: false,
              message: "vous ne pouvez pas créer d'utilisateur",
            });
        } else {
          res.status(201).json({ success: true, data: user });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
};
