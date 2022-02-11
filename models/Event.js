const mongoose = require("mongoose");
import User from "../models/User";
import Comment from "../models/Comment";
const { Schema } = mongoose;

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  keywords: {
    type: Array,
  },
  location: {
    type: Object,
  },
  address: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  notes: {
    type: Array,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  picture: {
    type: String,
  },
  date: {
    type: String,
  },
});

EventSchema.set("timestamps", true);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
