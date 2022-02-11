const mongoose = require("mongoose");
import User from "../models/User";
import Event from "../models/Event";
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

BookingSchema.set("timestamps", true);

BookingSchema.index({ event: 1, user: 1 }, { unique: true });
module.exports =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
