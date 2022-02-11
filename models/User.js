const mongoose = require("mongoose");
import Event from "../models/Event";
import Comment from "../models/Comment";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Veuillez indiquer votre nom"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Veuillez indiquer votre email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Veuillez indiquer votre mot de passe"],
  },
  imageAvatar: {
    type: String,
  },
  address: {
    type: Object,
  },
  myEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  myComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  role: {
    type: String,
    default: "user",
  },
});

UserSchema.set("timestamps", true);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
