import axios from "axios";
import { useState } from "react";

const LoginModal = ({
  open,
  user,
  onClose,
  setOpenLoginModal,
  setOpenSignupModal,
  setProfile,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3636/user/login", {
        username,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          // navigate("/profile");
          console.log(user);
          setOpenLoginModal(false);
          setProfile(true);
        } else {
          alert(data.message);
        }
      });
  };

  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <span className="modalBtn" onClick={onClose}>
          X
        </span>

        <h2 className="title"> Login </h2>
        <form action="login-box">
          <label htmlFor="username">username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="loginBtn"
            type="submit"
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
