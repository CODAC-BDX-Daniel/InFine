import dbConnect from "../../../utils/dbConnect";
import Event from "../../../models/Event";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const query = req.query.query;

        const events = await Event.find({
          keywords: { $regex: ".*" + query + ".*" },
        })
          .populate("users")
          .populate("comments");

        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};
