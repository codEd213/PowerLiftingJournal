import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import EditForm from "./components/EditForm";
import ViewWorkout from "./components/ViewWorkout";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/workout/new" element={<WorkoutForm />} />
          <Route path="/workouts/:id/edit" element={<EditForm />} />
          <Route path="/workouts/:id/view" element={<ViewWorkout />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
