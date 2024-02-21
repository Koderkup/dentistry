import Head from "next/head";
import { useState, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";
import s from "../../styles/CreateContent.module.scss";


const CreateContentManager = () => {
  const initialState = {
    type: '',
    title: '',
    widgetURL: '',
  };
  const [widget, setWidget] = useState(initialState);
  const { type, title, widgetURL } = widget;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

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

    if (!type || !title || !widgetURL )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    let res;
          res = await postData(
        "services",
        { ...widget },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };
  return (
    <div className={`container`}>
      <Head>
        <title>Content Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="title">Тип</label>
              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={''}
                  onChange={()=>{}}
                  name="serviceId"
                >
                  <option value={""}>выберите категорию</option>
                  {
                   [1,2,3].map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
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
