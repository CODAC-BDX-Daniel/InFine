import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const token = req.headers.authorization.split(" ")[1];
        const connecte = jwt.decode(token, process.env.JWT_SECRET);

        const user = await User.findById(connecte.id);
        const userSend = {
          username: user.username,
          imageAvatar: user.imageAvatar,
          email: user.email,
          adresse: user.address.label,
          rue: user.address.name,
          codeP: user.address.postcode,
          ville: user.address.city,
          coordinates: { lat: user.address.lat, lng: user.address.long },
        };

        res.status(200).json({ success: true, data: userSend });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
};
