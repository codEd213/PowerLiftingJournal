const Journal = require("../models/journal.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

module.exports = {
  getWorkouts: (req, res) => {
    Journal.find({})
      .populate("createdBy", "username email")
      .then((allWorkouts) => {
        console.log(allWorkouts);
        res.json(allWorkouts);
      })
      .catch((err) =>
        res.status(400).json({
          message: "Something went wrong in getting all workouts",
          error: err,
        })
      );
  },
  createWorkout: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);

    Journal.create({ ...req.body, createdBy: user._id })
      .then((addedWorkout) => {
        console.log(addedWorkout);
        res.json(addedWorkout);
      })
      .catch((err) =>
        res.status(400).json({
          message: "Something went wrong in creating workout",
          error: err,
        })
      );
  },
  getWorkoutByID: (req, res) => {
    Journal.findOne({ _id: req.params.id })
      .then((oneWorkout) => {
        console.log(oneWorkout);
        res.json(oneWorkout);
      })
      .catch((err) =>
        res.status(400).json({
          message: "Something went wrong in getting workout",
          error: err,
        })
      );
  },
  deleteWorkout: (req, res) => {
    Journal.deleteOne({ _id: req.params.id })
      .then((workout) => {
        console.log(workout);
        res.json(workout);
      })
      .catch((err) =>
        res.status(400).json({
          message: "Something went wrong in deleting workout",
          error: err,
        })
      );
  },
  updateWorkout: (req, res) => {
    Journal.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedWorkout) => {
        console.log(updatedWorkout);
        res.json(updatedWorkout);
      })
      .catch((err) =>
        res.status(400).json({
          message: "Something went wrong in updating workout",
          error: err,
        })
      );
  },
};
