import dbConnect from "../../../utils/dbConnect";
import jwt, { decode } from "jsonwebtoken";
import User from "../../../models/User";
import bcryptjs from "bcryptjs";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { body, method } = req;

  switch (method) {
    case "PUT":
      try {
        const jwtPayload = jwt.decode(req.body.token, process.env.JWT_SECRET);

        if (!req.body.password || typeof req.body.password !== "string") {
          res.status(400).json({
            success: false,
            error: "Merci d'insérer un mot de passe valide",
          });
        }
        if (req.body.password !== req.body.passwordConfirm) {
          return res.status(400).json({
            success: false,
            error: "le mot de passe ne correspond pas",
          });
        }
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const updatePassword = { password: hashedPassword };

        const user = await User.findOneAndUpdate(
          { email: jwtPayload.email },
          updatePassword,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!user) {
          return res.status(400).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true, data: "user" });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};
