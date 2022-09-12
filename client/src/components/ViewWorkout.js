import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewWorkout = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/workouts/${id}`)
      .then((res) => {
        setWorkout(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="col col-6 mx-auto">
      {/* Contains title and link */}
      <div className="nav-list">
        <span className="workout-link">
          <h1>My Journal</h1>
          <Link to="/">Home</Link>
        </span>
      </div>

      {/* Contains Description Box */}
      <div className="description-box">
        <div className="content">
          <h2>Sets: {workout.sets}</h2>
          <h2>Comment: {workout.comment}</h2>
          <h2>Description: {workout.description}</h2>
          <h2>Total Work: </h2>
          <br></br>
          <h2>Sets x Weight = {workout.work}</h2>
        </div>
      </div>
    </div>
  );
};

export default ViewWorkout;
