import s from '../../styles/Map.module.scss'
const Map = () => {
  return (
    <div className={s.map_container}>
      <iframe
        src="https://yandex.by/map-widget/v1/?from=mapframe&ll=30.257756%2C55.195956&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoyNDkwNTUwMTMyEkbQkdC10LvQsNGA0YPRgdGMLCDQktGW0YbQtdCx0YHQuiwg0L_RgNCw0YHQv9C10LrRgiDQpNGA0YPQvdC30LUsIDgx0LoxIgoN5A_yQRWpyFxC&source=mapframe&utm_source=mapframe&z=16.68"
        width="100%"
        height="400px"
        margin="0 auto"
        allowFullScreen={true}
        style={{ position: "relative" }}
      ></iframe>
    </div>
  );
};

export default Map;
