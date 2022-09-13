import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  //const {setIsLoggedIn} = props
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RES", res.data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log("error in login", err));
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-registration">
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
          <button
            className="btn"
            style={{ backgroundColor: "#1A1A1D", color: "#C3073F" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
