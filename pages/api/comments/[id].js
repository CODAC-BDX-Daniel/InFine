import dbConnect from "../../../utils/dbConnect";
import Comment from "../../../models/Comment";
import jwt from "jsonwebtoken";
import User from "../../../models/User";
import Event from "../../../models/Event";

let cloudinary = require("../../../cloudinary");
const fs = require("fs");
import HttpStatus from "http-status-codes";
import middleware from "../../../middleware/middleware";
import nextConnect from "next-connect";

dbConnect();

const handler = nextConnect();

handler.use(middleware);
const uploader = async (path) => await cloudinary.uploads(path, "Images");
handler.post(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const token = req.headers.authorization;
    const connecte = jwt.decode(token, process.env.JWT_SECRET);
    let pictures;
    const urls = [];

    const files = req.files.pictures;
    const content = req.body.content;

    if (files.length > 1) {
      for (const file of files) {
        const { filepath } = file;
        const newPath = await uploader(filepath);
        urls.push(newPath);
        fs.unlinkSync(filepath);
      }
      pictures = urls;
    } else {
      const { filepath } = files;
      const newPath = await uploader(filepath);
      pictures = newPath;
      fs.unlinkSync(filepath);
    }

    const user = await User.findById(connecte.id);
    const event = await Event.findById(id);
    const comm = {
      pictures: pictures,
      content: content,
      user: user.id,
      event: event.id,
    };

    const comment = await Comment.create(comm);

    user.myComments.push(comment.id);
    event.comments.push(comment.id);
    user.save();
    event.save();

    res.status(201).json({ success: true, data: "comment" });
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
  }
});

handler.get(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const comment = await Comment.findById(id)
      .populate("user")
      .populate("event");

    if (!comment) {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    await User.updateMany({}, { $pullAll: { myComments: [{ _id: id }] } });
    await Event.updateMany({}, { $pullAll: { comments: [{ _id: id }] } });

    if (!deletedComment) {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(200).json({ success: true });
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
