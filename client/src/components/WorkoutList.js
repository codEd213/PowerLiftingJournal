import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const WorkoutList = () => {
  const [list, setList] = useState([]);
  const { id } = useParams();
  const [workout, setWorkout] = useState({});
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/workouts/${id}`)
      .then((res) => {
        setWorkout(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/workouts")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = (workoutID) => {
    axios
      .delete(`http://localhost:8000/api/workouts/${workoutID}`)
      .then((res) => {
        const newList = list.filter((workout) => {
          return workout._id !== workoutID;
        });
        setList(newList);
        navigate("/");
      })
      .catch();
  };

  useEffect(() => {
    axios
      .get("https://api.goprogram.ai/inspiration")
      .then((res) => {
        setQuote(res.data.quote);
        setAuthor(res.data.author);
        console.log("THIS IS RESPONSE FROM API", res);
        console.log("This is quote", res.data.quote);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="list col col-6 mx-auto">
      {/* Contains title and link */}
      <div className="nav-list">
        <span className="workout-link">
          <h2 style={{ fontFamily: "Merienda" }}>
            "{quote}" - {author}
          </h2>
          {/* <Link to="/workout/new">Add Workout</Link> */}
          <a
            href={"/workout/new"}
            className="edit btn btn-sm"
            style={{
              backgroundColor: "#1A1A1D",
              color: "white",
              marginLeft: "10px",
              borderRadius: "10px",
              border: "2px solid red",
            }}
          >
            Add Workout
          </a>
        </span>
      </div>

      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Workout</th>
              <th scope="col">Comment</th>
              <th scope="col">Manage</th>
              <th scope="col">Total Weight/Minutes</th>
              <th scope="col">Date</th>
              <th scope="col">Created By</th>
            </tr>
          </thead>
          <tbody>
            {list.map((workout) => (
              <tr key={workout._id}>
                <a href={`/workouts/${workout._id}/view`}>
                  <td>{workout.type}</td>
                </a>
                <td>{workout.comment}</td>
                <td className="btns">
                  {/* <Link
                    to={`/workouts/${workout._id}/edit`}
                    className="text text-warning"
                  >
                    Edit
                  </Link>{" "} */}
                  <a
                    href={`/workouts/${workout._id}/edit`}
                    className="edit btn btn-sm"
                    style={{ color: "white", borderRadius: "10px" }}
                  >
                    Edit
                  </a>
                  |
                  <button
                    onClick={() => deleteHandler(workout._id)}
                    className="delete btn btn-sm"
                    style={{ borderRadius: "10px" }}
                  >
                    Delete
                  </button>
                </td>
                <td>{workout.work}</td>
                <td>{workout.date}</td>
                <td>Created By: {workout.createdBy.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutList;
