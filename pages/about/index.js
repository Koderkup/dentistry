import React, { useState, useEffect } from "react";
import Image from "next/image";
import s from "../../styles/About.module.scss";
const About = () => {
  const [imagePositions, setImagePositions] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  useEffect(() => {
    // Determination of the position of images with alt="about"
    const aboutImages = Array.from(
      document.querySelectorAll(`.${s.image_anouncement}[alt="about"]`)
    );
    const positions = aboutImages.map((img) => img.getBoundingClientRect().top);
    setImagePositions(positions);
  }, []);
  useEffect(() => {
    // Determination of visible images for scrolling
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const visibleImages = imagePositions.filter(
        (pos) => pos <= scrollY + window.innerHeight
      );
      setVisibleImages(visibleImages);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [imagePositions]);
  return (
    <div className={`${s.about}`}>
      <h1 id={s.first_anouncement}>Здоровье Ваших зубов начинается здесь!</h1>
      <Image
        src="https://i.postimg.cc/RF8dgK0m/Screenshot-9.png"
        alt="clinica"
        width={1000}
        height={600}
        className={s.about_image}
      ></Image>
      <div className={s.slide_description_wrapper}>
        <div className={s.slogan}>
          <h4 className={s.clinica}>Клиника «МираСтом»</h4>
          <p className={s.dentistry}>СТОМАТОЛОГИЯ</p>
          <strong className={s.premium}>ПРЕМИАЛЬНОГО КЛАССА</strong>
        </div>
        <iframe
          src="https://www.youtube.com/embed/UJB5TLtZS3o?rel=0&showinfo=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={s.video}
        ></iframe>
      </div>

      <section className={s.about_anouncement}>
        {[
          "https://i.postimg.cc/HsXVQZQY/mateerials10.png",
          "https://i.postimg.cc/B6X7J6mM/doctors10.png",
          "https://i.postimg.cc/SjFbSGsV/tehnology10.png",
        ].map((src, index) => (
          <Image
            key={index}
            src={src}
            width={360}
            height={340}
            alt="about"
            className={`${s.image_anouncement} ${
              visibleImages.includes(imagePositions[index]) ? s.visible : ""
            }`}
          />
        ))}
      </section>
      <div className="container">
        <article className={s.about_text} data-testid='about'>
          <p>
            Стоматологическая клиника Мирастом уже более 10 лет зарекомендовала
            себя как надежный и профессиональный медицинский центр. Мы
            предоставляем полный спектр стоматологических услуг высокого
            качества, оснащаем клинику современным оборудованием и наши
            врачи-стоматологи с высшим медицинским образованием и многолетним
            опытом работы представляют различные направления стоматологии, такие
            как терапевты, хирурги, ортодонты, пародонтологи, имплантологи и
            другие.
          </p>
          <p>
            Каждый врач нашей клиники постоянно повышает свою квалификацию и
            следит за новинками в области стоматологии. Мы прилагаем максимум
            усилий, чтобы создать комфортную атмосферу для наших пациентов и
            сделать посещение стоматолога приятным и безболезненным.
          </p>
          <p>
            Мы гарантируем индивидуальный подход к каждому пациенту и всегда
            готовы ответить на все вопросы и проконсультировать вас по любым
            вопросам, связанным со здоровьем зубов и полости рта.
          </p>
          <p>
            Наша клиника предлагает широкий спектр услуг, включая
            профессиональную гигиену полости рта, лечение кариеса и заболеваний
            десен, установку и удаление зубных протезов, лечение каналов,
            ортодонтию, имплантацию зубов, эстетическую стоматологию и многое
            другое. Мы уверены, что здоровые зубы - это основа общего здоровья
            организма и хорошего настроения. Поэтому, если вы заботитесь о своем
            здоровье и хотите иметь красивую и здоровую улыбку, обратитесь в
            стоматологическую клинику Мирастом - мы всегда рады видеть вас!
          </p>
          <p>
            Мы гордимся тем, что за многолетнюю историю нашей клиники мы помогли
            тысячам пациентов вернуть здоровье своих зубов и улыбнуться без
            стеснения. Мы продолжаем развиваться и совершенствоваться, чтобы
            оставаться лидером в области стоматологии и предоставлять своим
            пациентам только лучшие услуги.
          </p>
        </article>
      </div>
    </div>
  );
};

export default About;
