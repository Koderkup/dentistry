import { useState, useContext, useEffect } from "react";
import s from "../../styles/Reviews.module.scss";
import UserReviewForm from "@/components/UserReviewForm";
import Pagination from "@/components/Pagination";
import { DataContext } from "../../store/GlobalState";
import { getData, postData } from "../../utils/fetchData";
import usePagination from "@/hooks/usePagination";
import ReCAPTCHA from "react-google-recaptcha";
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
    count: reviews.length,
  });

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
    const removeIds = reviews
      .filter((review) => review.checked)
      .map((review) => review.id);
    setSelectedReviewsForRemove(removeIds);
  }, [reviews]);
  useEffect(() => {
    const start = new Date(reviews[0].timestamp);
    const end = new Date(reviews[reviews.length - 1].timestamp);
    setStartDate(
      start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate()
    );
    setEndDate(
      end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate()
    );
  }, []);

  useEffect(() => {
    const filteredReviews = reviewsProps
      .filter((review) => {
        const reviewDate = new Date(review.timestamp);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59);
        return reviewDate >= startDateObj && reviewDate <= endDateObj;
      })
      .sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
      });
    setReviews(filteredReviews);
  }, [startDate, endDate]);

  useEffect(() => {
    const allChecked = reviews
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
          return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
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
  return (
    <div className="container">
      <h1>Поделитесь своими впечатлениями</h1>
      <form
        style={{ maxWidth: "700px", margin: "auto" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Введите своё имя
          </label>
          <input
            type="text"
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
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Оставьте свой комментарий
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
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
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
        </div>
      </form>
      {auth.user && auth.user.role === "admin" && (
        <>
          <hr />
          <div
            className="mb-3 d-flex justify-content-between"
            style={{ margin: "auto", maxWidth: "540px" }}
          >
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input mx-1"
                id="exampleCheck1"
                onChange={handleSelectionAll}
                checked={checked}
                style={{ width: "25px", height: "25px" }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Выбрать все
              </label>
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
                      data: selectedReviewsForRemove,
                      id: selectedReviewsForRemove.length,
                      title: `Выбрано для удаления ${selectedReviewsForRemove.length} отзывов`,
                      type: "ADD_REVIEWS",
                    },
                  ],
                })
              }
            >
              Удалить выбранное
            </button>
          </div>
        </>
      )}
      <hr />
      <h1>Комментарии наших клиентов</h1>
      <p>Сортировать по дате:</p>
      <div className={s.data_inputs}>
        <span>
          С:
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </span>
        <span>
          По:
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </span>
      </div>
      <hr />
      {reviews.slice(firstContentIndex, lastContentIndex).map((review) => {
        return (
          <UserReviewForm
            key={review.id}
            review={review}
            checked={review.checked}
            handleSelectedReview={handleSelectedReview}
          />
        );
      })}
      <span>
        {page}/{totalPages}
      </span>
      <Pagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        nextPage={nextPage}
        prevPage={prevPage}
        setChecked={setChecked}
      />
    </div>
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
