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

  // const GetQuote = () => {
  //   const [quote, setQuote] = useState("");

  //   useEffect(() => {
  //     axios
  //       .get("https://api.goprogram.ai/inspiration")
  //       .then((res) => {
  //         setQuote(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  // };
  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
  };

  return (
    <div className="col col-6 mx-auto">
      {/* Contains title and link */}
      <div className="nav-list">
        <span className="workout-link" style={style}>
          <Link to="/">Home</Link>
        </span>
      </div>

      {/* Contains Description Box */}
      {/* <div className="description-box">
        <div className="content">
          <h2>Sets: {workout.sets}</h2>
          <h2>Comment: {workout.comment}</h2>
          <h2>Description: {workout.description}</h2>
          <h2>Total Work: (Sets x Weight) OR Time(mins) = {workout.work}</h2>
        </div>
      </div> */}
      <div className="list-group">
        <button
          type="button"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h3 className="mb-1">Sets: </h3>
            <medium>{workout.date}</medium>
          </div>
          <p className="mb-1" style={{ fontSize: "30px" }}>
            {workout.sets}
          </p>
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h3 className="mb-1">Comment: </h3>
            <medium>{workout.date}</medium>
          </div>
          <p className="mb-1" style={{ fontSize: "30px" }}>
            {workout.comment}
          </p>
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h3 className="mb-1">Description: </h3>
            <medium>{workout.date}</medium>
          </div>
          <p className="mb-1" style={{ fontSize: "30px" }}>
            {workout.description}
          </p>
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h3 className="mb-1">Total Work: </h3>
            <medium>{workout.date}</medium>
          </div>
          <p className="mb-1" style={{ fontSize: "30px" }}>
            (Sets x Time) OR Time(mins) = {workout.work}
          </p>
        </button>
      </div>
    </div>
  );
};

export default ViewWorkout;
