import React from 'react'

const Carousel = ({children}) => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide carousel-fade m-auto w-100"
      data-bs-ride="carousel"
      data-testid="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">{children}</div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
        data-testid="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
          style={{ backgroundColor: "#51DED1", opacity: "0.8" }}
        ></span>
        <span className="visually-hidden">Назад</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
        data-testid="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
          style={{ backgroundColor: "#51DED1", opacity: "0.8" }}
        ></span>
        <span className="visually-hidden">Вперёд</span>
      </button>
    </div>
  );
}

export default Carousel