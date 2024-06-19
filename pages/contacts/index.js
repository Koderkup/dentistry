import React, { useState, useRef } from "react";
import s from "../../styles/Contacts.module.scss";
import Map from "../../components/Map";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import { typography } from "@/utils/typography";
import useDeviceTypeDetect from "@/hooks/useDeviceTypeDetect";
import { PiEyeSlashThin } from "react-icons/pi";
import { PiEyeThin } from "react-icons/pi";
const Contacts = () => {
  const [visible, setVisible] = useState(false);
  const { CONTACTS_IMAGE_LOCATION_URL } = typography;
  const { isDesktop } = useDeviceTypeDetect();
  const imageRef = useRef([]);

  const handleCloseClick = () => {
    setVisible(false);
    imageRef.current.forEach((img) => img.classList.remove(`${s.show}`));
  };
  const handleOpenClick = (index) => {
    setVisible(true);
    imageRef.current[index].classList.add(`${s.show}`);
  };
  return (
    <div className="container">
      <div className={s.head_container}>
        <div className={s.info_text}>
          <h1>Контактная информация</h1>
          <p>Адрес: г. Витебск, ул. Фрунзе, 81/1</p>
          <p>Телефон: +375 (29) 813-86-90</p>
          <p>Электронная почта: mirastom2023@gmail.by</p>
        </div>
        <div className={s.map_container}>
          <Map />
        </div>
      </div>
      <div className={`container ${s.carousel_container}`}>
        {!isDesktop ? (
          <Carousel>
            {CONTACTS_IMAGE_LOCATION_URL.map((src, i) => (
              <div
                data-testid="carousel-item"
                className={`carousel-item ${i === 0 ? "active" : ""} ${
                  s.carousel_image
                }`}
                key={src}
              >
                <Image
                  src={src}
                  className={`d-block w-100 ${s.image}`}
                  alt="location"
                  width={400}
                  height={800}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className={s.line_item} data-testid="line-item">
            {CONTACTS_IMAGE_LOCATION_URL.map((src, i) => (
              <div className={s.carousel_container} key={src}>
                <Image
                  ref={(el) => (imageRef.current[i] = el)}
                  src={src}
                  className={s.image_desktop}
                  alt="location"
                  width={480}
                  height={700}
                />
                {!visible && (
                  <PiEyeThin
                    data-testid="PiEyeThin"
                    className={s.eye_icon}
                    onClick={() => handleOpenClick(i)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {visible && (
          <PiEyeSlashThin
            data-testid="PiEyeSlashThin"
            className={`${s.close} ${s.eye_icon}`}
            onClick={handleCloseClick}
          />
        )}
      </div>
    </div>
  );
};

export default Contacts;
