import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import EditForm from "./components/EditForm";
import ViewWorkout from "./components/ViewWorkout";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/workout/new" element={<WorkoutForm />} />
          <Route path="/workouts/:id/edit" element={<EditForm />} />
          <Route path="/workouts/:id/view" element={<ViewWorkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
