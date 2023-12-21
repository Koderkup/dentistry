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
          <h1 style={{ textAlign: "center" }}>Как мы можем Вам помочь</h1>
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
            <div className="container">
              <div className={`row  ${s.circle_wrapper}`}>
                <div
                  className={`col-lg-5 col-md-5 col-sm-12 mx-3 py-2 ${s.service_text}`}
                >
                  <div
                    class={`accordion accordion-flush ${s.accordion}`}
                    id="accordionFlushExample"
                  >
                    <div
                      class="accordion-item"
                    >
                      <h2 class="accordion-header" id="flush-headingOne">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <Image
                            src="./assets/therapy.svg"
                            width={50}
                            height={50}
                            className={`${s.img}`}
                          />
                          <span style={{ fontSize: "20px" }}>Терапия</span>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">Снятие острой боли</div>
                      </div>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">Лечение канала</div>
                      </div>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">Пломбирование зуба</div>
                      </div>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">Лечение десны</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-lg-5 col-md-5 col-sm-12 mx-3 py-2 ${s.service_text}`}
                >
                  <div
                    class={`accordion accordion-flush ${s.accordion}`}
                    id="accordionFlushExample1"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne1">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne1"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne1"
                        >
                          <Image
                            src="./assets/implant.svg"
                            width={50}
                            height={50}
                            className={`${s.img}`}
                          />
                          <span style={{ fontSize: "20px" }}>
                            Импланталогия
                          </span>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne1"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne1"
                        data-bs-parent="#accordionFlushExample1"
                      >
                        <div class="accordion-body">
                          Установка импланта тип1
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne1"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne1"
                        data-bs-parent="#accordionFlushExample1"
                      >
                        <div class="accordion-body">
                          Установка импланта тип2
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne1"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne1"
                        data-bs-parent="#accordionFlushExample1"
                      >
                        <div class="accordion-body">
                          Установка импланта тип3
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne1"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne1"
                        data-bs-parent="#accordionFlushExample1"
                      >
                        <div class="accordion-body">
                          Установка импланта тип4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-lg-5 col-md-5 col-sm-12 mx-3 py-2 ${s.service_text}`}
                >
                  <div
                    class={`accordion accordion-flush ${s.accordion}`}
                    id="accordionFlushExample2"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne2">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne2"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne2"
                        >
                          <Image
                            src="./assets/kid`s.svg"
                            width={50}
                            height={50}
                            className={`${s.img}`}
                          />
                          <span style={{ fontSize: "20px" }}>
                            Детская стоматология
                          </span>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne2"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne2"
                        data-bs-parent="#accordionFlushExample2"
                      >
                        <div class="accordion-body">
                          Установка импланта тип1
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne2"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne2"
                        data-bs-parent="#accordionFlushExample2"
                      >
                        <div class="accordion-body">
                          Установка импланта тип2
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne2"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne2"
                        data-bs-parent="#accordionFlushExample2"
                      >
                        <div class="accordion-body">
                          Установка импланта тип3
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne2"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne2"
                        data-bs-parent="#accordionFlushExample2"
                      >
                        <div class="accordion-body">
                          Установка импланта тип4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-lg-5 col-md-5 col-sm-12 mx-3 py-2 ${s.service_text}`}
                >
                  <div
                    class={`accordion accordion-flush ${s.accordion}`}
                    id="accordionFlushExample3"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne3">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne3"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne3"
                        >
                          <Image
                            src="./assets/ortoped.svg"
                            width={50}
                            height={50}
                            className={`${s.img}`}
                          />
                          <span style={{ fontSize: "20px" }}>Ортопедия</span>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne3"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne3"
                        data-bs-parent="#accordionFlushExample3"
                      >
                        <div class="accordion-body">
                          Установка импланта тип1
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne3"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne3"
                        data-bs-parent="#accordionFlushExample3"
                      >
                        <div class="accordion-body">
                          Установка импланта тип2
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne3"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne3"
                        data-bs-parent="#accordionFlushExample3"
                      >
                        <div class="accordion-body">
                          Установка импланта тип3
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne3"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne3"
                        data-bs-parent="#accordionFlushExample3"
                      >
                        <div class="accordion-body">
                          Установка импланта тип4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-lg-5 col-md-5 col-sm-12 mx-3 py-2 ${s.service_text}`}
                >
                  <div
                    class={`accordion accordion-flush ${s.accordion}`}
                    id="accordionFlushExample4"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne4">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne4"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne4"
                        >
                          <Image
                            src="./assets/surgeian.svg"
                            width={50}
                            height={50}
                            className={`${s.img}`}
                          />
                          <span style={{ fontSize: "20px" }}>
                            Лечение по страховке
                          </span>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne4"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne4"
                        data-bs-parent="#accordionFlushExample4"
                      >
                        <div class="accordion-body">
                          Установка импланта тип1
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne4"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne4"
                        data-bs-parent="#accordionFlushExample4"
                      >
                        <div class="accordion-body">
                          Установка импланта тип2
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne4"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne4"
                        data-bs-parent="#accordionFlushExample4"
                      >
                        <div class="accordion-body">
                          Установка импланта тип3
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne4"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne4"
                        data-bs-parent="#accordionFlushExample4"
                      >
                        <div class="accordion-body">
                          Установка импланта тип4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div
                  className={`col-lg-5 col-md-5 col-sm-12 mx-3 py-2 ${s.service_text}`}
                >
                  <div
                    class={`accordion accordion-flush ${s.accordion}`}
                    id="accordionFlushExample5"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne5">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne5"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne5"
                        >
                          <Image
                            src="./assets/surgeian2.svg"
                            width={50}
                            height={50}
                            className={`${s.img}`}
                          />
                          <span style={{ fontSize: "20px" }}>Хирургия</span>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne5"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne5"
                        data-bs-parent="#accordionFlushExample5"
                      >
                        <div class="accordion-body">
                          Установка импланта тип1
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne5"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne5"
                        data-bs-parent="#accordionFlushExample5"
                      >
                        <div class="accordion-body">
                          Установка импланта тип2
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne5"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne5"
                        data-bs-parent="#accordionFlushExample5"
                      >
                        <div class="accordion-body">
                          Установка импланта тип3
                        </div>
                      </div>
                      <div
                        id="flush-collapseOne5"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne5"
                        data-bs-parent="#accordionFlushExample5"
                      >
                        <div class="accordion-body">
                          Установка импланта тип4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div
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
            </div> */}
          </div>
          <div
            className={`container`}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <div className={`row`}>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className={s.circle_2}>
                  <div className={s.circle_1}>
                    <div className={s.center}>
                      <Image
                        src={"./assets/logo_mirastom.svg"}
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <Link href={`services/5`} className={`btn ${s.icon}`}>
                    <Image
                      src="./assets/surgeian2.svg"
                      width={50}
                      height={50}
                      className={`${s.img}`}
                    />
                  </Link>
                  <Link href={`services/5`} className={`btn ${s.icon}`}>
                    <Image
                      src="./assets/surgeian.svg"
                      width={50}
                      height={50}
                      className={`${s.img}`}
                    />
                  </Link>
                  <Link href={`services/5`} className={`btn ${s.icon}`}>
                    <Image
                      src="./assets/ortoped.svg"
                      width={50}
                      height={50}
                      className={`${s.img}`}
                    />
                  </Link>
                  <Link href={`services/5`} className={`btn ${s.icon}`}>
                    <Image
                      src="./assets/kid`s.svg"
                      width={50}
                      height={50}
                      className={`${s.img}`}
                    />
                  </Link>
                  <Link href={`services/5`} className={`btn ${s.icon}`}>
                    <Image
                      src="./assets/implant.svg"
                      width={50}
                      height={50}
                      className={`${s.img}`}
                    />
                  </Link>
                  <Link href={`services/5`} className={`btn ${s.icon}`}>
                    <Image
                      src="./assets/therapy.svg"
                      width={50}
                      height={50}
                      className={`${s.img}`}
                    />
                  </Link>
                </div>
              </div>
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
