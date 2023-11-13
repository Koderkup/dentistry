import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import Image from "next/image";
import s from '../../styles/DetatilDoctor.module.scss'
const DetailDoctor = (props) => {
  const [doctor] = useState(props.doctor[0]);
  const [tab, setTab] = useState(0);
  const { state, dispatch } = useContext(DataContext);

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };
  return (
    <div className="container">
      <h1 className={s.main_title}>Сведения о враче</h1>
      <div className={s.detail_doctor}>
        <div className={s.images_container}>
          <Image
            src={doctor.avatar[0].url}
            alt={doctor.avatar[0].url}
            width={500}
            height={500}
            className={s.main_image}
          />
          <div
            className="row mx-0"
            style={{ cursor: "pointer", marginTop: "4px" }}
          >
            {doctor.avatar.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                alt={img.url}
                width={80}
                height={80}
                className={`img-thumbnail rounded ${isActive(index)}`}
                style={{
                  height: "30%",
                  width: "30%",
                  border: "1px solid orangered",
                }}
                onClick={() => setTab(index)}
              />
            ))}
          </div>
        </div>
        <div className={s.text_wrapper}>
          <h2 className={`${s.name} text-uppercase`}>{doctor.sirname}</h2>
          <h3 className={`${s.name} text-uppercase`}>{doctor.fullname}</h3>
          <p className={s.description} style={{ textAlign: "justify" }}>
            {doctor.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailDoctor;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`doctors/${id}`);
  return {
    props: {
      doctor: res.doctor,
    },
  };
}
