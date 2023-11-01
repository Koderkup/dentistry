import s from '../../styles/Contacts.module.scss'
import Map from '../components/Map';
const Contacts = () => {
  return (
    <div className={s.container}>
      <div className={s.info_text}>
        <h1>Контактная информация</h1>
        <p>Адрес: г. Витебск, ул. Фрунзе, 81/1</p>
        <p>Телефон: +375 (29) 813-86-90</p>
        <p>Электронная почта: info@mirastom.by</p>
      </div>
      <div className={s.map_container}>
        <Map />
      </div>
    </div>
  );
}

export default Contacts