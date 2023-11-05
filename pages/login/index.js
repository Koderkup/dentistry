import Head from "next/head";
import Link from "next/link";

function Login() {
  return (
    <div>
      <Head>
        <title>Страница авторизации</title>
      </Head>
      <form className="mx-auto my-4" style={{maxWidth: '500px'}}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email адрес
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autoComplete="user-name"
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
          Вход
        </button>
        <p className="my-2">Ещё не зарегистрировались? <Link style={{color: 'crimson'}} href='/register'>Регистрация</Link></p>
      </form>
    </div>
  );
}

export default Login;
