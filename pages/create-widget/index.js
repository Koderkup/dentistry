import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { postData, getData } from "../../utils/fetchData";
import s from "../../styles/CreateWidget.module.scss";

const CreateContentManager = () => {
  const initialState = {
    type: "",
    title: "",
    widgetURL: "",
  };
  const [widget, setWidget] = useState(initialState);
  const { type, title, widgetURL } = widget;
  useEffect(() => {
    getData("widgets").then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { error: res.err } });
      } else {
        dispatch({ type: "ADD_WIDGET", payload: res.widgets });
      }
    });
  }, []);
  const { state, dispatch } = useContext(DataContext);
  const { auth, widgets } = state;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setWidget({ ...widget, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (!type || !title || !widgetURL)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    let res;
    res = await postData("widgets", { ...widget }, auth.token);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };
  return (
    <div className={`container`}>
      <Head>
        <title>Widget Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-8">
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="title">Тип</label>
              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={widget.type}
                  onChange={handleChangeInput}
                  name="type"
                >
                  <option value={""}>выберите категорию</option>
                  {Array.from(new Set(widgets.map((item) => item.type))).map(
                    (widget, index) => (
                      <option key={index} value={widget}>
                        {widget}
                      </option>
                    )
                  )}
                </select>
              </div>
              <label htmlFor="title">Название</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Название"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
              <label htmlFor="widgetURL">URL адрес</label>
              <input
                type="text"
                name="widgetURL"
                id="widgetURL"
                value={widgetURL}
                placeholder="ссылка на облако https://postimg.cc/"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-info my-2 px-4">
            Создать
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContentManager;
