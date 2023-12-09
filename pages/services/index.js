import { Inter } from "next/font/google";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import ServiceItem from "@/components/service/ServiceItem";
import { ServiceItemDefault } from "@/components/service/ServiceItem";
import s from "../../styles/Services.module.scss";
import { DataContext } from "../../store/GlobalState";
import OrderRingForm from "@/components/OrderRingForm";
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
          <h1>Как мы можем Вам помочь</h1>
          <h5 style={{ textAlign: "justify", textIndent: "40px" }}>
            Наши опытные стоматологи будут тесно сотрудничать с вами, чтобы
            определить, какие варианты лечения лучше всего подходят для
            достижения вашей идеальной улыбки. Хотите ли вы исправить дефект
            прикуса или надеетесь удалить изменение цвета с поверхности ваших
            зубов, у нас есть технологии и опыт для улучшения эстетического вида
            и функциональности ваших зубов. Вот некоторые из услуг, которые мы
            предоставляем:
          </h5>
          <div className={s.services_list}>
            {services.map((service, i) => (
              <ServiceItem key={service.id} service={service} />
            ))}
            {auth.user && auth.user.role === "admin" && <ServiceItemDefault />}
          </div>
        </div>
        <h5 style={{ textAlign: "justify" }}>
          Если вы хотите узнать больше о том, как наша стоматология может
          улучшить вашу улыбку с помощью стоматолагических процедур, свяжитесь с
          нами сегодня любым удобным способом, чтобы записаться на консультацию!
          <i>{"-->"}</i>
          <span>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#orderRingModal"
            >
              Заказать звонок
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
