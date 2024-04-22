import { useContext, useEffect } from "react";
import s from "../styles/UserReviewForm.module.scss";
import { MdStar, MdDateRange } from "react-icons/md";
import Image from "next/image";
import { DataContext } from "../store/GlobalState";

const UserReviewForm = ({ review, checked, handleSelectedReview }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const date = new Date(review.timestamp);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <MdStar style={{ color: "gold", fontSize: "30px" }} key={i} />
      );
    }
    return stars;
  };

  return (
    <form
      className={s.user_review_form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset disabled>
        <legend>
          <p>
            <MdDateRange />
            {date.getDate() +
              "." +
              (date.getMonth() + 1) +
              "." +
              date.getFullYear()}
          </p>
          <Image
            src={`/assets/${review.avatar}.png`}
            width={30}
            height={30}
            alt="user-avatar"
          />
          {review.name}
        </legend>
        <textarea
          className={`form-control ${s.autosize}`}
          id="exampleFormControlTextarea1"
          rows="3"
          defaultValue={review.comment}
        ></textarea>
        <div>
          <span>Рейтинг услуги: </span>
          {renderStars(review.rating)}
        </div>
      </fieldset>
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
                    type: "ADD_REVIEW",
                  },
                ],
              })
            }
          >
            Удалить
          </button>
        </>
      )}
    </form>
  );
};

export default UserReviewForm;
