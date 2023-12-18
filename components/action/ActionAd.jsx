import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const ActionAd = () => {
   const blurDataURL = "data:image/svg+xml;base64,...";
  return (
    <div className="container">
      <div className="card" style={{backgroundColor: 'white'}}>
        <Image
          src="https://res.cloudinary.com/dlr2olc8r/image/upload/v1701685505/test/action_to0h7a.jpg"
          className="card-img"
          alt="action-ad"
          width={800}
          height={500}
          rel="preload"
          as="image"
          blurDataURL={blurDataURL}
          placeholder="blur"
        />
        <div className="card-img-overlay" style={{ color: "#5F5F5F" }}>
          <h2 className="card-title" style={{ color: "#5F5F5F" }}>
            Ловите сезонные скидки на услуги!
          </h2>
          <h3 className="card-text" style={{ color: "#5F5F5F" }}>
            Вся информация о акциях в клинике Мирастом
          </h3>
          <h4 className="card-text" style={{ color: "#5F5F5F" }}>
            Скидки на лечение, протезирование, имплантацию, удаление, гигиену и
            отбеливание зубов
          </h4>
          <button type="button" className="btn btn-light">
            <Link
              href="/actions"
              style={{
                color: "#5F5F5F",
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