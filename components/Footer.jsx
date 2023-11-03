import Link from "next/link";
import Image from "next/image";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { FaViber, FaTelegram, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-gray text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <i className="fab fa-linkedin">
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              Ищите нас в социальных сетях:
            </span>
          </i>
        </div>
        <div>
          <a
            href="viber://chat?number=375298138690"
            style={{ margin: "0 10px" }}
            className="me-4 link-secondary"
          >
            <FaViber
              className="header-top__icon header-top__icon--round"
              color="#7360F2"
              size="32px"
            />
          </a>
          <a
            href="https://t.me/mirastom"
            style={{ margin: "0 10px" }}
            className="me-4 link-secondary"
          >
            <FaTelegram
              className="header-top__icon header-top__icon--round"
              color="#279FDB"
              size="32px"
            />
          </a>
          <a
            href="https://www.instagram.com/mirastom_vitebsk/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px" }}
            className="me-4 link-secondary"
          >
            <FaInstagram
              className="header-top__icon header-top__icon--round"
              color="#FD572D"
              size="32px"
            />
          </a>
        </div>
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <Image
                  src="./assets/logo_mirastom.svg"
                  width={30}
                  height={30}
                  alt="logo"
                />
                <i className="fas fa-gem me-3 text-secondary"></i>
                Мирастом
              </h6>
              <div>
                <p>Время работы:</p>
                <p>Пн-Пт: 9:00 - 20:00</p>
                <p>Суббота: 9:00 - 14:00 (ПО ЗАПИСИ)</p>
                <p>Воскресенье: выходной</p>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Ждем Вас!</h6>
              <p>
                <Link href="/" className="text-reset">
                  Главная
                </Link>
              </p>
              <p>
                <Link href="/services" className="text-reset">
                  Услуги
                </Link>
              </p>
              <p>
                <a href="/works" className="text-reset">
                  Наши работы
                </a>
              </p>
              <p>
                <Link href="/contacts" className="text-reset">
                  Контакты
                </Link>
              </p>
              <p>
                <Link href="/reviews" className="text-reset">
                  Отзывы
                </Link>
              </p>
              <p>
                <Link href="/about" className="text-reset">
                  О нас
                </Link>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Полезные статьи</h6>
              <p>
                <Link href="/articles" className="text-reset">
                  Перед посещением
                </Link>
              </p>
              <p>
                <Link href="/articles" className="text-reset">
                  Анастезия плюсы и минусы
                </Link>
              </p>
              <p>
                <Link href="/articles" className="text-reset">
                  Профилактика кариеса
                </Link>
              </p>
              <p>
                <Link href="/articles" className="text-reset">
                  Все статьи
                </Link>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Контакты:</h6>
              <p>
                <MdLocationOn
                  className="header-top__icon"
                  color="blue"
                  size="32px"
                />
                <i className="fas fa-home me-3 text-secondary">
                  г.Витебск, ул.Фрунзе, 81/1
                </i>
              </p>
              <p>
                <MdEmail
                  className="header-top__icon"
                  color="blue"
                  size="32px"
                />
                &nbsp;
                <i className="fas fa-envelope me-3 text-secondary">
                  mirastom2023@gmail.com
                </i>
              </p>
              <p>
                <i className="fas fa-phone me-3 text-secondary">
                  МТС: +375 (29) 813-86-90
                </i>
              </p>
              <p>
                <i className="fas fa-print me-3 text-secondary">
                  А1: +375 (29) 334-72-65
                </i>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}
      >
        <p style={{ textAlign: "center" }}>
          <span style={{ textAlign: "justify" }}>
            Обращаем Ваше внимание на то, что данный сайт носит исключительно
            ознакомительный характер. За более детальной информацией обращайтесь
            по телефону +375 (29) 813-86-90
          </span>
        </p>
        &copy; &nbsp;
        {new Date().getFullYear()}
        <Link
          className="text-reset fw-bold"
          href="/"
          style={{ textDecoration: "none" }}
        >
          &nbsp;Мирастом
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
