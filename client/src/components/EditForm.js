import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  const [type, setType] = useState("");
  const [sets, setSets] = useState(0);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [work, setWork] = useState(0);
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/workouts/${id}`)
      .then((res) => {
        setType(res.data.type);
        setSets(res.data.sets);
        setComment(res.data.comment);
        setDescription(res.data.description);
        setWork(res.data.work);
        setDate(res.data.date);
      })
      .catch((err) => console.log(err));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/workouts/${id}`, {
        type,
        sets,
        comment,
        description,
        work,
        date,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log("this is err", err);
        setErrors(err.response.data.error.errors);
      });
  };

  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
  };

  return (
    <div>
      <div className="nav-list">
        <span className="workout-link" style={style}>
          <Link to="/">Home</Link>
        </span>
        <span className="quote">
          <h2>Edit Workout</h2>
        </span>
      </div>

      <div className="form">
        <form onSubmit={submitHandler}>
          <div className="form-container">
            <div className="left-side">
              <label className="form-label">Type: </label>
              <select
                className="custom-select"
                onChange={(e) => setType(e.target.value)}
              >
                <option defaultValue>{type}</option>
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Stretch/Drills">Stretch/Drills</option>
              </select>
              {errors.type ? (
                <div className="text-danger">{errors.type.message}</div>
              ) : null}
              <br></br>

              <label className="form-label">Sets: </label>
              <input
                className="form-control"
                type="text"
                value={sets}
                name="sets"
                onChange={(e) => setSets(e.target.value)}
              />
              {errors.sets ? (
                <div className="text-danger">{errors.sets.message}</div>
              ) : null}
              <br></br>
              <label className="form-label">Comment: </label>
              <textarea
                className="form-control"
                type="text"
                value={comment}
                name="comment"
                rows="5"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {errors.comment ? (
                <div className="text-danger">{errors.comment.message}</div>
              ) : null}
              <br></br>
            </div>

            {/* Right Side */}
            <div className="right-side">
              <label className="form-label">Description: </label>
              <textarea
                className="form-control"
                type="text"
                value={description}
                name="description"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description ? (
                <div className="text-danger">{errors.description.message}</div>
              ) : null}
              <br></br>
              <label className="form-label">Work Done(Weight/Minutes) </label>
              <input
                className="form-control"
                type="text"
                value={work}
                name="Work"
                onChange={(e) => setWork(e.target.value)}
              />
              {errors.work ? (
                <div className="text-danger">{errors.work.message}</div>
              ) : null}
              <br></br>
              <label className="form-label">Date(mm/dd/yyyy): </label>
              <input
                className="form-control"
                type="text"
                value={date}
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date ? (
                <div className="text-danger">{errors.date.message}</div>
              ) : null}
              <button className="btn btn-primary mt-3">Edit Workout</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
