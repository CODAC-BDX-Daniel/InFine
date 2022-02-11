import dbConnect from "../../../utils/dbConnect";
import Comment from "../../../models/Comment";
import middleware from "../../../middleware/middleware";
import nextConnect from "next-connect";

const handler = nextConnect();
dbConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("user").populate("event");

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
