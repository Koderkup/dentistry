import { useContext, useState, useRef, useEffect } from "react";
import s from "../styles/UserReviewForm.module.scss";
import { MdStar, MdDateRange, MdFiberNew } from "react-icons/md";
import Image from "next/image";
import { DataContext } from "../store/GlobalState";
import { typography } from "@/utils/typography";
const UserReviewForm = ({ review, checked, handleSelectedReview }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [text, setText] = useState(review.comment);
  const { PUBLISH_IMAGE, DELETE_IMAGE } = typography;
  const date = new Date(review.timestamp);
  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [text]);
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
        e.stopPropagation();
      }}
      data-testid="form"
    >
      {auth.user && auth.user.role === "admin" ? (
        <fieldset className={s.user_fieldset}>
          <textarea
            ref={textareaRef}
            className={`${s.user_text}`}
            id="exampleFormControlTextarea1"
            value={text}
            rows={1}
            maxLength={200}
            onChange={handleTextChange}
          ></textarea>
          <div className={s.user_fieldset_triangle}></div>
        </fieldset>
      ) : (
        <fieldset disabled className={s.user_fieldset}>
          <textarea
            ref={textareaRef}
            className={`${s.user_text}`}
            id="exampleFormControlTextarea1"
            value={text}
            rows={1}
            maxLength={200}
            onChange={handleTextChange}
          ></textarea>
          <div className={s.user_fieldset_triangle}></div>
        </fieldset>
      )}

      <Image
        src={`/assets/${review.avatar}.png`}
        width={30}
        height={30}
        alt="user-avatar"
      />
      {review.name}
      <p>
        <MdDateRange />
        {date.getDate() +
          "." +
          String(date.getMonth() + 1).padStart(2, "0") +
          "." +
          date.getFullYear()}
        {auth.user && auth.user.role === "admin" && !review.view && (
          <MdFiberNew color="red" size={40} />
        )}
      </p>
      <div className={s.user_review_form_rating}>
        <span>Рейтинг услуги: </span>
        {renderStars(review.rating)}
      </div>
      {auth.user && auth.user.role === "admin" && (
        <div className={s.user_review_form_admin}>
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
          <button
            className="btn"
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
            <Image src={DELETE_IMAGE} width={30} height={30} alt="trash" />
          </button>
          <button
            className="btn"
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
                    message: "Сделать этот отзыв доступным для всех?"
                  },
                ],
              })
            }
          >
            <Image src={PUBLISH_IMAGE} width={30} height={30} alt="public" />
          </button>
        </div>
      )}
    </form>
  );
};

export default UserReviewForm;
