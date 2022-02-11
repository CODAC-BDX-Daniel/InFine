import dbConnect from "../../../utils/dbConnect";
import Booking from "../../../models/Booking";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {
        query: {id},
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const bookings = await Booking.find({})
                    .populate("user")
                    .populate("event");
                if (bookings.length == 0) {
                    throw "No Bookings in the base";
                }
                res.status(200).json({success: true, data: bookings});
            } catch (error) {
                res.status(400).json({success: false, error: error});
            }
            break;

        default:
            res.status(400).json({success: false, error: error.message});
            break;
    }
};
