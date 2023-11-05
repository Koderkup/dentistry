import React from "react";

const Question = () => {
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email:</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email  для обратной связи"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Сообщение</label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="3"
            placeholder="Ваш вопрос"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Question;
