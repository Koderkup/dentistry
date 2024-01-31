import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const ActionAd = () => {
   const blurDataURL = "data:image/svg+xml;base64,...";
  return (
    <div className="" style={{ width: "100%" }}>
      <div
        className="card"
        style={{ backgroundColor: "white", border: "none" }}
      >
        <Image
          src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1703673131/test/action_2_qzl7qh.png"
          className="img-fluid"
          alt="action-ad"
          width={900}
          height={700}
          rel="preload"
          as="image"
          blurDataURL={blurDataURL}
          placeholder="blur"
          style={{margin: 'auto'}}
        />
        <div className="card-img-overlay">
          <h2 className="card-title">
            Ловите сезонные скидки на услуги!
          </h2>
          <h3 className="card-text">
            Вся информация о акциях в клинике Мирастом
          </h3>
          <h4 className="card-text">
            Скидки на лечение, протезирование, имплантацию, удаление, гигиену и
            отбеливание зубов
          </h4>
          <button type="button" className="btn btn-light">
            <Link
              href="/actions"
              style={{
                fontSize: "24px",
                width: "150px",
                textDecoration: "none",
              }}
            >
              Узнать больше
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionAd