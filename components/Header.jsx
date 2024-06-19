import React, { useContext, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "../styles/Header.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

const Header = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, articles } = state;
  const isActive = (r) => {
    if (r === router.pathname) {
      return ` ${s.active}`;
    } else {
      return "";
    }
  };
  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };
  const adminRouter = () => {
    return (
      <>
        <div className="d-flex align-items-center" data-testid="admin-router">
          <div className="nav-item dropdown">
            <div
              className={`nav-link dropdown-toggle`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin menu
            </div>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
              data-bs-auto-close="outside"
            >
              <Link href="/create-content" className="dropdown-item fs-4">
                Создать контент
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const loggedRouter = () => {
    const handleMenuClick = (e) => {
      e.stopPropagation();
    };

    return (
      <>
        <div
          className="d-flex align-items-center col-lg-12 col-md-12 col-sm-12"
          data-testid="logged-router"
        >
          <div className="nav-item dropdown">
            <div
              className={`nav-link dropdown-toggle fs-4`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={handleMenuClick}
            >
              <Suspense fallback={<div>loading...</div>}>
                <Image
                  src={
                    auth.user.avatar.url
                      ? auth.user.avatar.url
                      : process.env.DEFAULT_USER_IMAGE
                  }
                  alt={auth.user.avatar.url}
                  width={20}
                  height={20}
                  style={{
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    transform: "translateY(-3px)",
                    marginRight: "3px",
                  }}
                />
              </Suspense>
              {auth.user.name}
            </div>

            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
              data-bs-auto-close="outside"
              onClick={handleMenuClick}
            >
              <Link href="/profile" className="dropdown-item fs-4">
                Profile
              </Link>
              <div className="dropdown-divider"></div>
              {auth.user && auth.user.role === "admin" && (
                <>
                  <Link href="/users" className="dropdown-item fs-4">
                    Users
                  </Link>
                  <div className="dropdown-divider"></div>
                </>
              )}

              <button className="dropdown-item fs-4" onClick={handleLogout}>
                Logout
              </button>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item fs-4">
                {Object.keys(auth).length !== 0 &&
                  auth.user.role === "admin" &&
                  adminRouter()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <nav className={`navbar navbar-expand-xl ${s.header}`}>
          <header className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Suspense fallback={<div>loading...</div>}>
                <Image
                  src="https://i.postimg.cc/KcBtY2Zr/logo-4-Photo-Room-png-Photo-Room.png"
                  width={70}
                  height={70}
                  alt="logo"
                />
              </Suspense>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarNavDropdown"
            >
              <ul className={`navbar-nav`}>
                <li
                  className={`nav-item ${
                    router.pathname === "/" ? s.active : ""
                  } ${s.navbar}`}
                >
                  <Link
                    className="nav-link fs-4 active"
                    aria-current="page"
                    href="/"
                  >
                    Главная
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    router.pathname === "/services" ? s.active : ""
                  }`}
                >
                  <Link className={`nav-link fs-4`} href="/services">
                    Услуги
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    router.pathname === "/works" ? s.active : ""
                  }`}
                >
                  <Link
                    className={`nav-link fs-4 `}
                    href="/works"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Наши работы
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    router.pathname === "/contacts" ? s.active : ""
                  }`}
                >
                  <Link className={`nav-link fs-4`} href="/contacts">
                    Контакты
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    router.pathname === "/reviews" ? s.active : ""
                  }`}
                >
                  <Link className={`nav-link fs-4`} href="/reviews">
                    Отзывы
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    router.pathname === "/about" ? s.active : ""
                  }`}
                >
                  <Link
                    className={`nav-link fs-4 `}
                    href="/about"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    О нас
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    router.pathname === "/price" ? s.active : ""
                  }`}
                >
                  <Link
                    className={`nav-link fs-4 `}
                    href="/price"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Цены
                  </Link>
                </li>
                <li className={`nav-item dropdown`}>
                  <Link
                    className={`nav-link dropdown-toggle fs-4 ${s.useful}`}
                    href="/articles passHref"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "darkgray" }}
                  >
                    Полезное
                  </Link>
                  <ul className="dropdown-menu" style={{ maxWidth: "500px" }}>
                    {articles.map((article) => (
                      <li key={article.id}>
                        <Link
                          style={{
                            maxWidth: "100%",
                            overflow: "hidden",
                            whiteSpace: "wrap",
                          }}
                          className="dropdown-item fs-4"
                          href={`/articles/${article.id}`}
                        >
                          {article.header}
                          <div className="dropdown-divider"></div>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link className="dropdown-item fs-4" href="/articles">
                        Все статьи
                        <div className="dropdown-divider"></div>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item fs-4" href="/question">
                        Задайте нам вопрос
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className={s.login_button}>
                {Object.keys(auth).length === 0 ? (
                  <Link
                    className={"nav-link fs-4" + isActive("/login")}
                    href="/login"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <FaUserAlt />
                    {!auth.user && "Войти"}
                  </Link>
                ) : (
                  loggedRouter()
                )}
              </div>
            </div>
          </header>
        </nav>
        <div className={s.border}></div>
      </div>
      <div style={{ width: "100%", height: "100px" }}></div>
    </>
  );
};

export default Header;
