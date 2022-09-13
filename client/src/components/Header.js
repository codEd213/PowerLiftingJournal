import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import axios from "axios";

function Header({ isLoggedIn }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
      console.log("THIS IS USER:::", user);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/logout", {}, { withCredentials: true })
      .then((res) => {
        Cookies.remove("userToken");
        setUser(null);
        navigate("/login");
      })
      .catch((err) => console.log("Logout error", err));
  };

  const mystyle = {
    backgroundColor: "#1A1A1D",
  };

  return (
    <div className="nav-bar col-12" style={mystyle}>
      <div>
        <h1
          className="text-center journal "
          style={{
            color: "#C3073F",
            height: "50px",
          }}
        >
          My Journal
        </h1>
        <div className="text-center">
          {/* <NavLink to="/workout/new" className="m-3 text text-light">
            Add Workout
          </NavLink> */}
        </div>
      </div>
      <div className="lr-links text-right">
        {user ? (
          <div>
            <h2 className="text text-light" style={{ marginRight: "50px" }}>
              Welcome, {user.userName}!
            </h2>
            <button
              onClick={handleLogout}
              className="btn btn-m"
              style={{
                marginLeft: "125px",
                backgroundColor: "#6f2232",
                color: "white",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <NavLink className="m-3 text text-danger" to="/login">
              Login
            </NavLink>
            <span> | </span>
            <NavLink className="m-3 text text-danger" to="/register">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
