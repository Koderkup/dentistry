import React from "react";
import Image from "next/image";
import Link from "next/link";
import s from "../../styles/Action.module.scss";
const ActionAd = () => {
  const blurDataURL = "data:image/svg+xml;base64,...";
  return (
    <div className="container" style={{ width: "100%" }}>
      <div
        className="card"
        style={{ backgroundColor: "white", border: "none" }}
      >
        <Image
          src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1707064370/test/action-add_iicf3y.png"
          className="img-fluid"
          alt="action-ad"
          width={900}
          height={600}
          rel="preload"
          as="image"
          blurDataURL={blurDataURL}
          placeholder="blur"
          style={{ margin: "auto", width: "100%" }}
        />
        <div className={`card-img-overlay ${s.overlay}`}>
          <p className={s.paragraph}>
            Улыбайтесь с уверенностью! В клинике Мирастом - доступны акции для
            здоровых и красивых улыбок.
          </p>
          <button
            type="button"
            className="btn btn-light"
            style={{
              backgroundColor: "rgba(248,249,250, 0.5)",
              width: "200px",
            }}
          >
            <Link
              href="/actions"
              style={{
                textDecoration: "none",
              }}
            >
              Узнать больше
            </Link>
          </button>
        </div>
      </div>
      <div className={`row ${s.banner}`}>
        <div className="card mb-3 col-lg-6" style={{ border: "none" }}>
          <div className="row g-0">
            <div
              className="col-md-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="./assets/dental_insurance.svg"
                width={100}
                height={100}
                className="img-fluid rounded-start"
                alt="dettistry-icon"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Лечение зубов по страховке</h5>
                <p className="card-text">
                  Получите первоклассное стоматологическое лечение с
                  использованием страхового покрытия! Работаем практически со
                  всеми страховыми компаниями страны.
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    консультация +375(29)813-86-90
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3 col-lg-6" style={{ border: "none" }}>
          <div className="row g-0">
            <div
              className="col-md-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="./assets/warranty.svg"
                width={100}
                height={100}
                className="img-fluid rounded-start"
                alt="dettistry-icon"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Нам можно доверять</h5>
                <p className="card-text">
                  Мы гордимся своим качественным лечением и уверены в его
                  результате. Поэтому мы предлагаем нашим пациентам гарантию на
                  наши стоматологические услуги.
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    консультация +375(29)813-86-90
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionAd;
