import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "@/utils/valid";
import { DataContext } from "@/store/GlobalState";
import { postData } from "@/utils/fetchData";
function Register() {
  const initialState = { name: "", email: "", password: "", cf_password: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;
  const { state, dispatch } = useContext(DataContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) {
      return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    }
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/register", userData);
    console.log(res);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };
  return (
    <div>
      <Head>
        <title>Страница регистрации</title>
      </Head>
      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Имя
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeInput}
            aria-describedby="emailHelp"
            autoComplete="user-name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email адрес
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={email}
            onChange={handleChangeInput}
            aria-describedby="emailHelp"
            autoComplete="user-email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Потвердите пароль
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputCF_Password1"
            autoComplete="current-cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Регистрация
        </button>
        <p className="my-2">
          Уже зарегистрировались?{" "}
          <Link style={{ color: "crimson" }} href="/login">
            Вход
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
