import Image from 'next/image'
import s from '../styles/Welcome.module.scss'
const Welcom = () => {
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: "20px",
      }}
    >
      <h1 style={{ marginTop: "20px", marginBottom: "40px" }}>
        Добро пожаловать в стоматологическую клинику Мирастом
      </h1>
      <div className={s.content}>
        <div className={s.text_wrapper}>
          <p className={s.text}>
            <i>
              Наша современная стоматологическая клиника способна гарантировать
              быстрое, безболезненное и качественное лечение. Это касается даже
              самых сложных проблем. Врачи подходят к каждому пациенту
              индивидуально. Они проводят исследование и предлагают такую
              методику, которая будет оптимальной и сможет вписаться в бюджет
              клиента. Время приёма не имеет чётких рамок. Для врача нашей
              клиники важно сделать работу качественно. Каждому этапу лечения
              уделяется достаточно внимания.
            </i>
          </p>
        </div>
        <div className={s.image_container}>
          <Image
            src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1701785172/test/%D0%92%D1%81%D0%B5_%D0%B4%D0%BE%D0%BF_115_odfurb.jpg"
            alt="mirastom_team"
            width={680}
            height={550}
            className={s.image}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcom