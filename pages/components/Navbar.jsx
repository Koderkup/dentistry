import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "../../styles/Navbar.module.scss";
import { FaUserAlt } from "react-icons/fa";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
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
              <Link className="nav-link fs-4" href="/doctors">
                Наши врачи
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-4" href="/services">
                Стоматологические услуги
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fs-4"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Полезные статьи
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item fs-4" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item fs-4" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item fs-4" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className={s.login_button}>
            <Link className="nav-link fs-4" href="/contacts">
              <FaUserAlt />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
