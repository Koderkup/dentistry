import { useContext, useState } from "react";
import s from "../styles/UserReviewForm.module.scss";
import { MdStar, MdDateRange, MdFiberNew } from "react-icons/md";
import Image from "next/image";
import { DataContext } from "../store/GlobalState";
const UserReviewForm = ({ review, checked, handleSelectedReview }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [text, setText] = useState(review.comment);
  const date = new Date(review.timestamp);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <MdStar
          style={{ color: "gold", fontSize: "30px" }}
          key={i}
          data-testid="star-svg"
        />
      );
    }
    return stars;
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form
      className={s.user_review_form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      data-testid="form"
    >
      <legend>
        <p>
          <MdDateRange />
          {date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear()}
          {auth.user && auth.user.role === "admin" && !review.view && (
            <MdFiberNew color="red" size={40} />
          )}
        </p>
        <Image
          src={`/assets/${review.avatar}.png`}
          width={30}
          height={30}
          alt="user-avatar"
        />
        {review.name}
      </legend>
      {auth.user && auth.user.role === "admin" ? (
        <fieldset>
          <textarea
            className={`form-control ${s.autosize}`}
            id="exampleFormControlTextarea1"
            rows="3"
            value={text}
            onChange={handleTextChange}
          ></textarea>
        </fieldset>
      ) : (
        <fieldset disabled>
          <textarea
            className={`form-control ${s.autosize}`}
            id="exampleFormControlTextarea1"
            rows="3"
            value={text}
            onChange={handleTextChange}
          ></textarea>
        </fieldset>
      )}
      <div>
        <span>Рейтинг услуги: </span>
        {renderStars(review.rating)}
      </div>
      {auth.user && auth.user.role === "admin" && (
        <>
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id="disabledFieldsetCheck"
                checked={checked}
                onChange={() => {
                  handleSelectedReview(review.id);
                }}
                style={{ width: "25px", height: "25px" }}
              />
              <label
                className="form-check-label"
                htmlFor="disabledFieldsetCheck"
              ></label>
            </div>
          </div>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              dispatch({
                type: "ADD_MODAL",
                payload: [
                  {
                    data: [review],
                    id: review.id,
                    title: `Это отзыв оставил - ${review.name} ?`,
                    type: "DELETE_REVIEW",
                  },
                ],
              })
            }
          >
            Удалить
          </button>
          <button
            className="btn btn-info"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              dispatch({
                type: "ADD_MODAL",
                payload: [
                  {
                    data: { ...review, comment: text, view: true },
                    id: review.id,
                    title: `Вы хотите опубликовать отзыв - ${review.name} ?`,
                    type: "ADD_REVIEW",
                  },
                ],
              })
            }
          >
            Опубликовать
          </button>
        </>
      )}
    </form>
  );
};

export default UserReviewForm;
