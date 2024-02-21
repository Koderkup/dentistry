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
            Наша современная стоматологическая клиника способна гарантировать
            быстрое, безболезненное и качественное лечение. Это касается даже
            самых сложных проблем. Врачи подходят к каждому пациенту
            индивидуально. Они проводят исследование и предлагают такую
            методику, которая будет оптимальной и сможет вписаться в бюджет
            клиента. Время приёма не имеет чётких рамок. Для врача нашей клиники
            важно сделать работу качественно. Каждому этапу лечения уделяется
            достаточно внимания.
          </p>
        </div>
        <div className={s.image_container}>
          <Image
            src="https://i.postimg.cc/13FMPJPk/all-Photoroom-png-Photoroom.png"
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