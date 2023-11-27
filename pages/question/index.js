import { useState, useContext } from "react";
import { postData } from "@/utils/fetchData";
import { DataContext } from "@/store/GlobalState";

const Question = () => {
  const initialState = { name: "", email: "", text: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, text } = userData;
  const { state, dispatch } = useContext(DataContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const emailHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("/send-email/question", userData, "email");
    if (res.error)
      return dispatch({ type: "NOTIFY", payload: { error: res.error } });
    return dispatch({ type: "NOTIFY", payload: { success: res.message } });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form
        className="border border-secondary rounded p-4"
        style={{ minWidth: "70%", marginTop: "10px" }}
      >
        <div className="form-group">
          <label htmlFor="exampleInputName1">Ваше имя:</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Как к Вам обращаться?"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email:</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email  для обратной связи"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Сообщение</label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="3"
            placeholder="Ваш вопрос"
            name="text"
            value={text}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={emailHandler}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Question;
