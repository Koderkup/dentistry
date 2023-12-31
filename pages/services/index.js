import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import ServiceItem from "@/components/service/ServiceItem";
import { ServiceItemDefault } from "@/components/service/ServiceItem";
import s from "../../styles/Services.module.scss";
import { DataContext } from "../../store/GlobalState";
import OrderRingForm from "@/components/OrderRingForm";
import { FaPhone } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
const Services = ({ serviceProps, subServicesProps }) => {
  const [services, setServices] = useState(serviceProps);
  const [subservices, setSubservices] = useState(subServicesProps);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  return (
    <>
      <>
        <OrderRingForm />
      </>
      <div className="container">
        <div className={s.service_wrapper}>
          <h1 style={{ textAlign: "center" }}>Услуги стоматологии</h1>
          <p
            style={{
              textAlign: "justify",
              textIndent: "40px",
              fontSize: "1.2em",
            }}
          >
            Наши опытные стоматологи будут тесно сотрудничать с вами, чтобы
            определить, какие варианты лечения лучше всего подходят для
            достижения вашей идеальной улыбки. Хотите ли вы исправить дефект
            прикуса или надеетесь удалить изменение цвета с поверхности ваших
            зубов, у нас есть технологии и опыт для улучшения эстетического вида
            и функциональности ваших зубов. Вот некоторые из услуг, которые мы
            предоставляем:
          </p>
          <div className={s.services_list}>
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {services.map((service, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to={index}
                      className={`${
                        index === 0 ? "active" : ""
                      } {s.carousel_indicator}`}
                      aria-current={`${index === 0 ? true : false}`}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  );
                })}
              </div>
              <div className="carousel-inner">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <Image
                      src={service.image[0].url}
                      className={`${s.img}`}
                      alt="service"
                      width={400}
                      height={600}
                    />
                    <div className="carousel-caption d-md-block">
                      <div className={s.sliderLabel}>
                        <p className={s.slider_title}>{service.title}</p>
                        <p>{service.intro}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                {/* <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                  style={{ backgroundColor: "gray", opacity: "0.6" }}
                ></span> */}
                <span>
                  <FiChevronLeft
                    style={{
                      color: "#34A0A0",
                      fontWeight: "bold",
                      fontSize: "45px",
                    }}
                  />
                </span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                {/* <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                  style={{ backgroundColor: "gray", opacity: "0.6" }}
                ></span> */}
                <span>
                  <FiChevronRight
                    style={{
                      color: "#34A0A0",
                      fontWeight: "bold",
                      fontSize: "45px",
                    }}
                  />
                </span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* -------------------------------------------------------------------------------------------------------- */}

          <section className="container">
            <h1>Перечень услуг</h1>
            <div className="row">
              {services.map((service, index) => (
                <div
                  className={`col-md-6 col-sm-12`}
                  style={{ margin: "0.8% auto" }}
                >
                  <div
                    className={`accordion accordion-flush`}
                    id={`accordion${index}`}
                  >
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse${index}`}
                        style={{
                          backgroundColor: "white",
                          fontSize: "22px",
                        }}
                      >
                        <Image
                          src={"./assets/logo_mirastom.svg"}
                          width={40}
                          height={40}
                          style={{ marginRight: "20px" }}
                        />
                        {service.title}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent={`#accordion${index}`}
                    >
                      {subservices
                        .filter(
                          (subservice) => subservice.serviceId === service.id
                        )
                        .map((item) => (
                          <div
                            key={item.title}
                            className="accordion-body fst-italic"
                            style={{ padding: "8px" }}
                          >
                            <Link
                              href="/"
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              {item.title}
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------------------------------------------------------------- */}
        </div>
        <p
          style={{
            textAlign: "justify",
            textIndent: "40px",
            fontSize: "1.2em",
          }}
        >
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
        </p>
        <p></p>
        <hr />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const res1 = await getData("services");
  const res2 = await getData("subservices");

  return {
    props: {
      serviceProps: res1.services,
      subServicesProps: res2.subServices,
      results: {
        services: res1.result,
        subServices: res2.result,
      },
    },
  };
}

export default Services;
