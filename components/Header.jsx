import React, { useContext } from "react";
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
        <div className="d-flex align-items-center">
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
              <Link href="/create" className="dropdown-item fs-4">
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
        <div className="d-flex align-items-center">
          <div className="nav-item dropdown">
            <div
              className={`nav-link dropdown-toggle fs-4`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={handleMenuClick}
            >
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
    <nav
      className="navbar navbar-expand-xl"
      style={{ backgroundColor: "#51DED1" }}
    >
      <header className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image
            src="./assets/logo_mirastom.svg"
            width={60}
            height={60}
            alt="logo"
          />
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
              className={`nav-item ${router.pathname === "/" ? s.active : ""} ${
                s.navbar
              }`}
            >
              <Link
                className="nav-link fs-4 active"
                aria-current="page"
                href="/"
                style={{ color: "white" }}
              >
                Главная
              </Link>
            </li>
            <li
              className={`nav-item ${
                router.pathname === "/services" ? s.active : ""
              }`}
            >
              <Link
                className={`nav-link fs-4`}
                href="/services"
                style={{ color: "white" }}
              >
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
                style={{ whiteSpace: "nowrap", color: "white" }}
              >
                Наши работы
              </Link>
            </li>
            <li
              className={`nav-item ${
                router.pathname === "/contacts" ? s.active : ""
              }`}
            >
              <Link
                className={`nav-link fs-4`}
                href="/contacts"
                style={{ color: "white" }}
              >
                Контакты
              </Link>
            </li>
            <li
              className={`nav-item ${
                router.pathname === "/reviews" ? s.active : ""
              }`}
            >
              <Link
                className={`nav-link fs-4`}
                href="/reviews"
                style={{ color: "white" }}
              >
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
                style={{ whiteSpace: "nowrap", color: "white" }}
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
                style={{ whiteSpace: "nowrap", color: "white" }}
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
                Sign In
              </Link>
            ) : (
              loggedRouter()
            )}
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;
