import { useEffect, useState } from "react";
import axios from "axios";
import "./AdviceGeneratorApp.scss";
import SignupModal from "./AGAcomponents/SignupModal";
import LoginModal from "./AGAcomponents/LoginModal";
import FavoritesModal from "./AGAcomponents/FavoritesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

function AdviceGeneratorApp() {
  const [adviceId, setAdviceId] = useState("");
  const [advice, setAdvice] = useState("");
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openFavoritesModal, setOpenFavoritesModal] = useState(false);
  const [profile, setProfile] = useState(false);
  const [user, setUser] = useState("");
  const [favorites, setFavorites] = useState("");
  const [getAdvices, setGetAdvices] = useState("");

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = () => {
    axios
      .get(`https://api.adviceslip.com/advice`)
      .then(({ data }) => {
        setAdvice(data.slip.advice);
        setAdviceId(data.slip.id);
      })
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => console.error("Error:", err));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3636/advice")
      .then(({ data }) => {
        setGetAdvices(data);
      })
      .catch((err) => console.error("Error:", err));
  }, [getAdvices]);

  const likeAdvice = () => {
    setFavorites(advice);
    console.log(favorites);
  };

  const saveAdvice = () => {
    if (favorites) {
      const newAdvice = axios
        .post("http://localhost:3636/advice/", {
          advice: favorites,
          owner: user._id,
        })
        .catch((err) => console.error("Error:", err));
      setGetAdvices(getAdvices, newAdvice);
      console.log(getAdvices);
      setOpenFavoritesModal(true);
    } else {
      alert(
        "Not any favorite advice to your collection yet. When you like an advice, we advice you to press like."
      );
      setOpenFavoritesModal(false);
    }
  };

  const deleteAdvice = async (id) => {
    const data = await fetch("http://localhost:3636/advice/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error:", err));

    setGetAdvices((getAdvices) =>
      getAdvices.filter((getAdvice) => getAdvice._id !== data._id)
    );
  };

  return (
    <div className="App">
      {profile ? (
        <div className=" logedIn-Bar">
          <h1 className="user-name">{user.username}</h1>
          <div className="like_div">
            <a
              className="heart"
              onClick={() => {
                likeAdvice();
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </a>
            <a
              className="my_favs"
              onClick={() => {
                saveAdvice();
              }}
            >
              My favorites
            </a>
          </div>
        </div>
      ) : (
        <div className="navBar">
          <a
            onClick={() => {
              setOpenSignupModal(true);
            }}
          >
            Signup
          </a>
          <a
            onClick={() => {
              setOpenLoginModal(true);
            }}
          >
            Login
          </a>
        </div>
      )}

      <SignupModal
        setOpenSignupModal={setOpenSignupModal}
        setOpenLoginModal={setOpenLoginModal}
        open={openSignupModal}
        onClose={() => {
          setOpenSignupModal(false);
        }}
      />
      <LoginModal
        user={user}
        setOpenLoginModal={setOpenLoginModal}
        setProfile={setProfile}
        open={openLoginModal}
        onClose={() => {
          setOpenLoginModal(false);
        }}
      />
      <FavoritesModal
        getAdvices={getAdvices}
        deleteAdvice={deleteAdvice}
        open={openFavoritesModal}
        onClose={() => {
          setOpenFavoritesModal(false);
        }}
      />

      <div id="container">
        <div id="advArea">
          <h4 class="advId">{adviceId}</h4>
          <h1 class="adv">{advice}</h1>
        </div>
        <div id="theLines">
          <hr class="line" />
          <hr class="dotes" />
          <hr class="dotes" />
          <hr class="line" />
        </div>
        <div id="button">
          <button
            onClick={() => {
              getAdvice();
            }}
            class="btn"
          >
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                fill="#202733"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdviceGeneratorApp;
