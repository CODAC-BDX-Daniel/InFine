import dbConnect from "../../../utils/dbConnect";
import Event from "../../../models/Event";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const events = await Event.find({})
          .populate("users")
          .populate("comments");

        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const reponse = {
          title: req.body.title_fr,
          description: req.body.description_fr,

          keywords: req.body.keywords_fr
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .split(";"),
          location: req.body.location_coordinates,
          address: req.body.location_address,
          date: req.body.lastdate,
          picture: req.body.location_image,
        };
        const event = await Event.create(reponse);

        res.status(201).json({ success: true, data: event });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
};
