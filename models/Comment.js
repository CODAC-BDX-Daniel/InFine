const mongoose = require("mongoose");
import User from "../models/User";
import Event from "../models/Event";
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  pictures: {
    type: Array,
  },
  content: {
    type: String,
  },
});

CommentSchema.set("timestamps", true);

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
