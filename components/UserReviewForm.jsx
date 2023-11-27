import { useContext, useEffect } from "react";
import s from "../styles/UserReviewForm.module.scss";
import { MdStar, MdDateRange } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Image from "next/image";
import { DataContext } from "../store/GlobalState";

const UserReviewForm = ({ review, handleDelete, checked, setChecked }) => {
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
useEffect(()=>{
  if(checked){
    setChecked(true);
  }
},[]);
  return (
    <form className={s.user_review_form} onSubmit={handleDelete}>
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
                className="form-check-input"
                type="checkbox"
                id="disabledFieldsetCheck"
                checked={checked}
                disabled
              />
              <label
                className="form-check-label"
                htmlFor="disabledFieldsetCheck"
              >
                <AiOutlineCheckCircle />
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-danger">
            Удалить
          </button>
        </>
      )}
    </form>
  );
};

export default UserReviewForm;
