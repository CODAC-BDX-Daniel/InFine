import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const query = req.body.query
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        const users = await User.find({ username: { $regex: query } })
          .populate("myEvents")
          .populate("myComments");

        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};
