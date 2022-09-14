import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setIsLoggedIn }) {
  //const {setIsLoggedIn} = props
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RES", res.data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log("error in registration", err);
        setErrors(err.response.data);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="login-registration"
      style={{ marginTop: "20px" }}
    >
      <div className="form-group">
        <label htmlFor="">Username: </label>
        <input
          className="form-control"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="">Email: </label>
        <input
          className="form-control"
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="">Password: </label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="">Confirm Password: </label>
        <input
          className="form-control"
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {errors ? <div className="text-danger">{errors.message}</div> : null}
      <br></br>
      <button style={{ backgroundColor: "#1A1A1D", color: "#C3073F" }}>
        Register
      </button>
    </form>
  );
}

export default Register;
