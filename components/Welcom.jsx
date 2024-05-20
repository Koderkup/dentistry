import { useContext } from "react";
import Image from "next/image";
import s from "../styles/Welcome.module.scss";
import Link from "next/link";
import { DataContext } from "@/store/GlobalState";
const Welcom = () => {
  const { state } = useContext(DataContext);
  const { filtered_articles } = state;
  return (
    <main className={s.welcom_container}>
      <h1>Добро пожаловать в стоматологическую клинику Мирастом</h1>
      <div className={s.content}>
        <div className={s.image_container}>
          <Image
            src="https://i.postimg.cc/13FMPJPk/all-Photoroom-png-Photoroom.png"
            alt="mirastom_team"
            width={500}
            height={550}
            className={`${s.image} col-lg-12 col-md-12 col-sm-12`}
          />
        </div>
        <div className={s.welcom_wrapper}>
          <article className={`${s.text}`}>
            Наша современная стоматологическая клиника способна гарантировать
            быстрое, безболезненное и качественное лечение. Это касается даже
            самых сложных проблем. Врачи подходят к каждому пациенту
            индивидуально, внимательно проводят исследование и предлагают
            оптимальную методику лечения, которая учитывает не только
            потребности пациента, но и его бюджет. Мы понимаем, что время
            пациента ценно, поэтому в нашей клинике время приёма не имеет чётких
            рамок. Мы стремимся сделать все работы качественно и полностью
            посвящаем каждому этапу лечения достаточно внимания. Но наша забота
            о пациентах не ограничивается только медицинскими аспектами. Мы
            также стремимся создать комфортную и приятную атмосферу в нашей
            клинике. Наши дружелюбные и внимательные сотрудники всегда готовы
            ответить на ваши вопросы и обеспечить вас заботливым отношением.
            Кроме того, мы осознаем, что посещение стоматолога может вызывать
            определенное беспокойство у некоторых пациентов. Поэтому мы
            предлагаем различные методы снижения болевых ощущений и стремимся
            сделать процедуры максимально комфортными. Мы приглашаем вас стать
            частью нашей стоматологической семьи и доверить нам заботу о вашем
            улыбке. Мы гарантируем, что ваше посещение в нашей клинике будет
            приятным и результативным.
          </article>
          <aside className={`${s.aside}`} data-testid="aside">
            <h3>
              <em>Наша специализация:</em>
            </h3>
            {filtered_articles && filtered_articles.length >= 4 && (
              <ul>
                <li>
                  <Link href={`articles/${filtered_articles[0].id}`}>
                    <img
                      src="https://i.postimg.cc/ryR6r7Yp/Screenshot-24.png"
                      alt="Зубы за день"
                      title="Зубы за день"
                    />
                    <strong>Зубы за день</strong>{" "}
                  </Link>
                </li>
                <li>
                  <Link href={`articles/${filtered_articles[1].id}`}>
                    <img
                      src="https://i.postimg.cc/J4j9TZ8V/Screenshot-25.png"
                      alt="Технология All-on-4"
                      title="Технология All-on-4"
                    />
                    <strong>Технология All-on-4</strong>{" "}
                  </Link>
                </li>
                <li>
                  <Link href={`articles/${filtered_articles[2].id}`}>
                    <img
                      src="https://i.postimg.cc/y8B22x6J/Screenshot-26.png"
                      alt="Имплантация зубов"
                      title="Имплантация зубов"
                    />
                    <strong>Имплантация зубов</strong>{" "}
                  </Link>
                </li>
                <li>
                  <Link href={`articles/${filtered_articles[3].id}`}>
                    <img
                      src="https://i.postimg.cc/1z325dqs/Screenshot-27.png"
                      alt="Преображение улыбки"
                      title="Преображение улыбки"
                    />
                    <strong>Преображение улыбки</strong>{" "}
                  </Link>
                </li>{" "}
              </ul>
            )}
            <p>
              <Link href="services/">
                <em>Список всех наших услуг</em>
              </Link>
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Welcom;
