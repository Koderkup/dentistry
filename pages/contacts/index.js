import s from "../../styles/Contacts.module.scss";
import Map from "../../components/Map";
import Image from "next/image";
const Contacts = () => {
  return (
    <div className="container">
      <div className={s.container}>
        <div className={s.info_text}>
          <h1>Контактная информация</h1>
          <p>Адрес: г. Витебск, ул. Фрунзе, 81/1</p>
          <p>Телефон: +375 (29) 813-86-90</p>
          <p>Электронная почта: mirastom2023@gmail.by</p>
        </div>
        <div className={s.map_container}>
          <Map />
        </div>
      </div>
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Image
                src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1699188678/test/Screenshot_5_rdtckm.png"
                className="d-block w-100"
                alt="location"
                width={500}
                height={500}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1699188690/test/Screenshot_4_ys9mbp.png"
                className="d-block w-100"
                alt="location"
                width={500}
                height={500}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1699188701/test/Screenshot_3_eru9e4.png"
                className="d-block w-100"
                alt="location"
                width={500}
                height={500}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Назад</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Вперёд</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
