import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "../styles/Header.module.scss";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const isActive = (r) => {
    if (r === router.pathname) {
      return ` ${s.active}`;
    } else {
      return "";
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
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
          <ul className="navbar-nav">
            <li
              className={`nav-item ${router.pathname === "/" ? s.active : ""}`}
            >
              <Link
                className="nav-link active fs-4"
                aria-current="page"
                href="/"
              >
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fs-4 ${
                  router.pathname === "/services" ? s.active : ""
                }`}
                href="/services"
              >
                Услуги
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fs-4 ${
                  router.pathname === "/works" ? s.active : ""
                }`}
                href="/works"
                style={{ whiteSpace: "nowrap" }}
              >
                Наши работы
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fs-4 ${
                  router.pathname === "/contacts" ? s.active : ""
                }`}
                href="/contacts"
              >
                Контакты
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fs-4 ${
                  router.pathname === "/reviews" ? s.active : ""
                }`}
                href="/reviews"
              >
                Отзывы
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fs-4 ${
                  router.pathname === "/about" ? s.active : ""
                }`}
                href="/about"
                style={{ whiteSpace: "nowrap" }}
              >
                О нас
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle fs-4 ${
                  router.pathname === "/articles" ? s.active : ""
                } ${s.useful}`}
                href="/articles passHref"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Полезное
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item fs-4"
                    href="/articles/article-1"
                  >
                    Перед посещением
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item fs-4"
                    href="/articles/article-2"
                  >
                    Анастезия плюсы и минусы
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item fs-4"
                    href="/articles/article-3"
                  >
                    Профилактика кариеса
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item fs-4" href="/articles">
                    Все статьи
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
            <Link
              className={"nav-link fs-4" + isActive("/login")}
              href="/login"
              style={{ whiteSpace: "nowrap" }}
            >
              <FaUserAlt />
              Sign In
            </Link>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;
