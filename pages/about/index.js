import Image from "next/image";
import s from "../../styles/About.module.scss";
const About = () => {
  return (
    <div className={`container ${s.about}`}>
      <h1 id={s.first_anouncement}>Здоровье Ваших зубов начинается здесь!</h1>
      <div className={s.image_container}>
        <Image
          src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1699343461/test/Screenshot_6_abxhuo.png"
          alt="clinica"
          width={800}
          height={500}
          style={{ border: "2px solid gray", borderRadius: "5px" }}
        ></Image>
      </div>
      <div className={s.about_text}>
        <p>
          Стоматологическая клиника Мирастом уже более 20 лет зарекомендовала
          себя как надежный и профессиональный медицинский центр. Мы
          предоставляем полный спектр стоматологических услуг высокого качества,
          оснащаем клинику современным оборудованием и наши врачи-стоматологи с
          высшим медицинским образованием и многолетним опытом работы
          представляют различные направления стоматологии, такие как терапевты,
          хирурги, ортодонты, пародонтологи, имплантологи и другие.
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
          Наша клиника предлагает широкий спектр услуг, включая профессиональную
          гигиену полости рта, лечение кариеса и заболеваний десен, установку и
          удаление зубных протезов, лечение каналов, ортодонтию, имплантацию
          зубов, эстетическую стоматологию и многое другое. Мы уверены, что
          здоровые зубы - это основа общего здоровья организма и хорошего
          настроения. Поэтому, если вы заботитесь о своем здоровье и хотите
          иметь красивую и здоровую улыбку, обратитесь в стоматологическую
          клинику Мирастом - мы всегда рады видеть вас!
        </p>
        <p>
          Мы гордимся тем, что за многолетнюю историю нашей клиники мы помогли
          тысячам пациентов вернуть здоровье своих зубов и улыбнуться без
          стеснения. Мы продолжаем развиваться и совершенствоваться, чтобы
          оставаться лидером в области стоматологии и предоставлять своим
          пациентам только лучшие услуги.
        </p>
      </div>
    </div>
  );
};

export default About;
