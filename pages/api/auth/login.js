import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET;

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { username, password } = req.body;
        let user = await User.findOne({ username }).lean();

        if (!user) {
          return res
            .status(400)
            .json({ success: false, error: "Invalid username/password" });
        }

        if (await bcryptjs.compare(password, user.password)) {
          const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

          return res.status(200).json({ success: true, access_token: token });
        }
        res
          .status(400)
          .json({ success: false, error: "Pseudo1 ou mot de passe incorrect" });
      } catch (error) {
        res.status(400).json({ success: false, error: "erreur sur le catch" });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Invalid method" });
  }
};
