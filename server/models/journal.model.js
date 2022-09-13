const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Must choose type of workout!"],
      enum: ["Strength", "Cardio", "Stretch/Drills"],
    },
    sets: {
      type: Number,
      maxlength: [3, "Cannot be longer than 3 characters"],
      default: 0,
    },
    comment: {
      type: String,
      required: [true, "Must provide comment!"],
      maxlength: [100, "Cannot be longer than 100 characters!"],
      minlength: [5, "Cannot be shorter than 5 characters!"],
    },
    description: {
      type: String,
      required: [true, "Must provide description!"],
      maxlength: [200, "Cannot be longer than 200 characters!"],
      minlength: [5, "Cannot be shorter than 5 characters!"],
    },
    work: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      required: [true, "Must provide date!"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Journal = mongoose.model("Journal", JournalSchema);

module.exports = Journal;
