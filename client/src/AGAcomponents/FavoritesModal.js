import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FavoritesModal = ({ open, onClose, getAdvices, deleteAdvice }) => {
  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <a className="modalBtn" onClick={onClose}>
          X
        </a>

        <h2 class="title"> My Favorites Advices </h2>
        <div>
          {getAdvices &&
            getAdvices.map((getAdvice) => {
              return (
                <div className="favAdvices" key={getAdvice._id}>
                  <ul>
                    <li className="favs">
                      {getAdvice.advice}
                      {"  "}
                      <a
                        onClick={() => {
                          deleteAdvice(getAdvice._id);
                        }}
                      >
                        <FontAwesomeIcon className="trash" icon={faTrash} />
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
