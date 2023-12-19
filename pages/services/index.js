import { Inter } from "next/font/google";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import ServiceItem from "@/components/service/ServiceItem";
import { ServiceItemDefault } from "@/components/service/ServiceItem";
import s from "../../styles/Services.module.scss";
import { DataContext } from "../../store/GlobalState";
import OrderRingForm from "@/components/OrderRingForm";
import { FaPhone } from "react-icons/fa";
const Services = ({ serviceProps }) => {
  const [services, setServices] = useState(serviceProps);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  return (
    <>
      <>
        <OrderRingForm />
      </>
      <div className="container">
        <div className={s.service_wrapper}>
          <h1 style={{ color: "#51DED1" }}>Как мы можем Вам помочь</h1>
          <h5
            style={{
              textAlign: "justify",
              textIndent: "40px",
              color: "#948FA5",
            }}
          >
            Наши опытные стоматологи будут тесно сотрудничать с вами, чтобы
            определить, какие варианты лечения лучше всего подходят для
            достижения вашей идеальной улыбки. Хотите ли вы исправить дефект
            прикуса или надеетесь удалить изменение цвета с поверхности ваших
            зубов, у нас есть технологии и опыт для улучшения эстетического вида
            и функциональности ваших зубов. Вот некоторые из услуг, которые мы
            предоставляем:
          </h5>
          <div className={s.services_list}>
            <div
              id="carouselExampleFade"
              class="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                {services.map((service, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={service.id}
                  >
                    <ServiceItem service={service} />
                  </div>
                ))}
                {auth.user && auth.user.role === "admin" && (
                  <ServiceItemDefault />
                )}
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                  style={{ backgroundColor: "#51DED1", borderRadius: "20%" }}
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                  style={{ backgroundColor: "#51DED1", borderRadius: "20%" }}
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <h5 style={{ textAlign: "justify", color: "#948FA5" }}>
          Если вы хотите узнать больше о том, как наша стоматология может
          улучшить вашу улыбку с помощью стоматолагических процедур, свяжитесь с
          нами сегодня любым удобным способом, чтобы записаться на консультацию!
          <span>
            <button
              type="button"
              className={`btn btn-primary ${s.order_ring}`}
              data-bs-toggle="modal"
              data-bs-target="#orderRingModal"
              style={{ textAlign: "center", verticalAlign: "middle" }}
            >
              <FaPhone />
            </button>
          </span>
        </h5>
        <p></p>
        <hr />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const res = await getData("services");
  return {
    props: {
      serviceProps: res.services,
      results: res.result,
    },
  };
}

export default Services;
