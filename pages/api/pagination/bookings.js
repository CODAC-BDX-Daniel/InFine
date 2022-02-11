import dbConnect from "../../../utils/dbConnect";
import Booking from "../../../models/Booking";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const curPage = req.query.page || 1;
        const perPage = 5;
        const bookings = await Booking.find()
          .populate("user")
          .populate("event")
          .skip((curPage - 1) * perPage)
          .limit(perPage);

        const totalBookings = await Booking.find().countDocuments();

        res.status(200).json({
          success: true,
          bookings: bookings,
          nbBookings: totalBookings,
          curPage: curPage,
          maxPage: Math.ceil(totalBookings / perPage),
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};
