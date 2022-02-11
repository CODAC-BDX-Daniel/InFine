import dbConnect from "../../../utils/dbConnect";
import Event from "../../../models/Event";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const curPage = req.query.page || 1;
        const perPage = 5;
        const events = await Event.find()
          .populate("users")
          .populate("comments")
          .skip((curPage - 1) * perPage)
          .limit(perPage);

        const totalEvents = await Event.find().countDocuments();

        res.status(200).json({
          success: true,
          events: events,
          nbEvents: totalEvents,
          curPage: curPage,
          maxPage: Math.ceil(totalEvents / perPage),
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};
