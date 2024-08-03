import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import s from "../../styles/Reviews.module.scss";
import UserReviewForm from "@/components/UserReviewForm";
import Pagination from "@/components/Pagination";
import { DataContext } from "../../store/GlobalState";
import { getData, postData } from "../../utils/fetchData";
import usePagination from "@/hooks/usePagination";
import ReCAPTCHA from "react-google-recaptcha";
import AdButton from "@/components/AdButton";
import { typography } from "@/utils/typography";
import RemoveSelected from "@/components/RemoveSelected";
function Reviews({ reviewsProps }) {
  const initialState = { name: "", comment: "", rating: 5, avatar: "woman" };
  const [userComment, setUserComment] = useState(initialState);
  const { name, comment, rating, avatar } = userComment;
  const [reviews, setReviews] = useState(reviewsProps);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checked, setChecked] = useState(false);
  const [delivary, setDelivary] = useState(true);
  const [formData, setFormData] = useState({ recaptchaResponse: "" });
  const [selectedReviewsForRemove, setSelectedReviewsForRemove] = useState([]);
  const [visibilatyReviewForm, setVisibilatyReviewForm] = useState(false);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 5,
    count: Array.isArray(reviews) ? reviews.length : 0,
  });
  const {
    ADD_REVIEW,
    REVIEW_IMAGE,
    REVIEW_LINK,
    ADD_CONTENT_STYLE,
    DELETE_IMAGE,
  } = typography;
  const handleOpenReviewForm = () => {
    setVisibilatyReviewForm(true);
  };
  const handleCloseReviewForm = () => {
    setVisibilatyReviewForm(false);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const updateCheckedStatusAll = (checkedValue) => {
    const updatedReviews = reviews.map((review, index) => {
      if (index >= firstContentIndex && index <= lastContentIndex - 1) {
        return {
          ...review,
          checked: checkedValue,
        };
      }
      return review;
    });
    setReviews(updatedReviews);
  };
  const handleSelectionAll = (e) => {
    setChecked((prevChecked) => !prevChecked);
    updateCheckedStatusAll(!checked);
  };
  useEffect(() => {
    const removeIds = (Array.isArray(reviews) ? reviews : [])
      .filter((review) => review.checked)
      .map((review) => review.id);
    setSelectedReviewsForRemove(removeIds);
  }, [reviews]);

  useEffect(() => {
    if (Array.isArray(reviews) && reviews.length > 0) {
      const start = new Date(reviews[0].timestamp);
      const end = new Date(reviews[reviews.length - 1].timestamp);
      setStartDate(
        start.getFullYear() +
          "-" +
          String(start.getMonth() + 1).padStart(2, "0") +
          "-" +
          start.getDate()
      );
      setEndDate(
        end.getFullYear() +
          "-" +
          String(end.getMonth() + 1).padStart(2, "0") +
          "-" +
          end.getDate()
      );
    }
  }, []);

  useEffect(() => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59);
    const filteredReviews = (Array.isArray(reviewsProps) ? reviewsProps : [])
      .filter((review) => {
        const reviewDate = new Date(review.timestamp);
        return reviewDate >= startDateObj && reviewDate <= endDateObj;
      })
      .filter((review) => {
        return auth.user && auth.user.role === "admin" ? review : review.view;
      })
      .sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
      });
    setReviews(filteredReviews);
  }, [startDate, endDate, reviewsProps]);

  useEffect(() => {
    const allChecked = (Array.isArray(reviews) ? reviews : [])
      .slice(firstContentIndex, lastContentIndex)
      .every((element) => element.checked);
    setChecked(allChecked);
  }, [firstContentIndex, lastContentIndex, reviews]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserComment({ ...userComment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/recaptcha", formData);
      if (response.success) {
        dispatch({ type: "NOTIFY", payload: { loading: true } });
        const res = await postData("/reviews", userComment);
        if (res.status == "success") {
          setDelivary(true);
          return dispatch({
            type: "NOTIFY",
            payload: {
              success: `Ваш отзыв отпрален на модерацию status: ${res.msg}`,
            },
          });
        }
        if (res.err) {
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        }
      } else {
        console.error("Недействительный ответ reCAPTCHA");
      }
    } catch (error) {
      console.error("Ошибка при проверке reCAPTCHA:", error);
    }
  };

  const handleRecaptchaChange = (response) => {
    setFormData({ ...formData, recaptchaResponse: response });
    setDelivary(false);
  };
  const handleSelectedReview = (id) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === id) {
        const checkedValue = !review.checked;
        return {
          ...review,
          checked: checkedValue,
        };
      }
      return review;
    });
    setReviews(updatedReviews);
  };
  const showHideData = (e) => {
    const elem = e.target.parentNode;
    if (!elem.style.right) {
      elem.style.right = "-199px";
    }
    elem.style.right = elem.style.right === "-199px" ? "10px" : "-199px";
  };
  return (
    <>
      <div className="container" style={{ minWidth: "100vw" }}>
        {visibilatyReviewForm && (
          <form
            style={{ maxWidth: "700px", margin: "auto" }}
            onSubmit={handleSubmit}
            className={s.review_form}
          >
            <h3>Поделитесь своими впечатлениями</h3>
            <Image
              src="./assets/close_cross.svg"
              width={40}
              height={40}
              alt="cross"
              className={s.review_form_cross}
              onClick={handleCloseReviewForm}
            />
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Введите своё имя
              </label>
              <input
                type="text"
                data-testid="name"
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
                name="name"
                value={name}
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Оставьте свой комментарий
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                data-testid="comment"
                name="comment"
                value={comment}
                onChange={handleChangeInput}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputNumber" className="form-label">
                Оцените наши услуги
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                name="rating"
                data-testid="rating"
                value={rating}
                onChange={handleChangeInput}
                min="0"
                max="5"
              />
            </div>
            <label htmlFor="flexRadioDefault1">Выберите пол:</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="avatar"
                id="flexRadioDefault1"
                value="woman"
                onChange={handleChangeInput}
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Женский
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="avatar"
                id="flexRadioDefault2"
                value="man"
                onChange={handleChangeInput}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Мужской
              </label>
            </div>
            <div className={s.ReCAPTCHA}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ maxHeight: "50px" }}
                disabled={delivary}
              >
                Опубликовать
              </button>
              <ReCAPTCHA
                data-testid="recaptcha"
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            </div>
          </form>
        )}
        {!visibilatyReviewForm && (
          <div className={s.reviewForm_wrapper}>
            <Image
              className={s.preReviewForm}
              src={"https://i.postimg.cc/L8ZL90y2/md-rev-bg.png"}
              width={700}
              height={500}
              alt="pleased client"
            />
            <Image
              className={s.title}
              src={"./assets/reviews-heading.svg"}
              width={600}
              height={400}
              alt="reviews"
            />
          </div>
        )}
        <div className={s.data_inputs}>
          <span className={s.data_inputs_before} onClick={showHideData}>
            Сортировать
          </span>
          <span>
            <i>С:</i>
          </span>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <span>
            <i>По:</i>
          </span>
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </div>
        <div className={s.reviews_wrapper}>
          {(Array.isArray(reviews) ? reviews : [])
            .slice(firstContentIndex, lastContentIndex + 1)
            .map((review) => {
              return (
                <UserReviewForm
                  key={review.id}
                  review={review}
                  checked={review.checked}
                  handleSelectedReview={handleSelectedReview}
                />
              );
            })}
        </div>
        <span>
          {page}/{totalPages}
        </span>
        <Pagination
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
      {auth.user && auth.user.role === "admin" ? (
        <RemoveSelected
          handleSelectionAll={handleSelectionAll}
          selectedReviewsForRemove={selectedReviewsForRemove}
          checked={checked}
        />
      ) : (
        <AdButton
          title={ADD_REVIEW}
          link={REVIEW_LINK}
          image={REVIEW_IMAGE}
          style={ADD_CONTENT_STYLE}
          onClick={handleOpenReviewForm}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await getData("reviews");
  return {
    props: {
      reviewsProps: res.reviews,
      results: res.result,
    },
  };
}

export default Reviews;
