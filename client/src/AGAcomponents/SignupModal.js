import axios from "axios";
import { useEffect, useState } from "react";

const SignupModal = ({
  open,
  onClose,
  setOpenLoginModal,
  setOpenSignupModal,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3636/user/signup", {
        username,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.message === "User already exist ") {
          setOpenSignupModal(false);
          setOpenLoginModal(true);
        } else {
          alert(data.message);
        }
      });
  };

  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <a className="modalBtn" onClick={onClose}>
          X
        </a>

        <h2 class="title"> Sign up </h2>
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
            class="signupBtn"
            type="submit"
            onClick={(e) => {
              signUp(e);
            }}
          >
            signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
