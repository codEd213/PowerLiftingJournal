const JournalController = require("../controllers/journal.controller");

module.exports = (app) => {
  app.get("/api/workouts", JournalController.getWorkouts);
  app.get("/api/workouts/:id", JournalController.getWorkoutByID);
  app.post("/api/workouts", JournalController.createWorkout);
  app.put("/api/workouts/:id", JournalController.updateWorkout);
  app.delete("/api/workouts/:id", JournalController.deleteWorkout);
};
