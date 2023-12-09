import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import Image from "next/image";
import s from "../../styles/DetatilService.module.scss";

const DetailService = (props) => {
  const [service] = useState(props.service[0]);
  const [tab, setTab] = useState(0);
  const { state, dispatch } = useContext(DataContext);

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };
  return (
    <div className="container">
      <h1 className={s.main_title}>Сведения об услуге</h1>
      <div className={s.detail_service}>
        <div className={s.images_container}>
          <Image
            src={service.image[0].url}
            alt={service.image[0].url}
            width={500}
            height={500}
            className={s.main_image}
          />
          <div
            className="row mx-0"
            style={{ cursor: "pointer", marginTop: "4px" }}
          >
            {service.image.map((img, index) => (
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
          <h2 className={`${s.name} text-uppercase`}>{service.title}</h2>
          <p className={s.description} style={{ textAlign: "justify" }}>
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailService;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`services/${id}`);
  return {
    props: {
      service: res.service,
    },
  };
}
