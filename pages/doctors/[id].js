import { useState } from "react";
import { getData } from "../../utils/fetchData";
import Image from "next/image";
import s from "../../styles/DetatilDoctor.module.scss";
import useDeviceTypeDetect from "@/hooks/useDeviceTypeDetect";
import useFormattingText from "@/hooks/useFormattingText";
import { FaChevronLeft } from "react-icons/fa";
const DetailDoctor = (props) => {
  const [doctor] = useState(props.doctor[0]);
  const { isMobile, isSmallTablet, isTablet, isDesktop } =
    useDeviceTypeDetect();
  const { heading, paragraphs } = useFormattingText(doctor.description);
  const [isClicked, setIsClicked] = useState({
    isClicked1: false,
    isClicked2: false,
    isClicked3: false,
  });

  const handleClick = (value) => {
    setIsClicked((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  const headerRowRightContent = (
    isMobile,
    isSmallTablet,
    isTablet,
    isDesktop
  ) => {
    let headerRowRightClassName = `${s.header__row} ${s.header__row_right} ${
      isMobile
        ? s.header__row_right_mobile
        : isSmallTablet
        ? s.header__row_right_smalltablet
        : isTablet
        ? s.header__row_right_tablet
        : s.header__row_right_desktop
    }`;
    return (
      <div className={headerRowRightClassName}>
        <div
          style={{
            transform: isClicked.isClicked1
              ? "translateX(-84%)"
              : "translateX(0%)",
            transition: "transform 0.5s ease",
          }}
        >
          {isMobile && (
            <FaChevronLeft
              onClick={() => {
                handleClick("isClicked1");
              }}
              style={{
                transform: isClicked.isClicked1
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
                position: "absolute",
                top: "30%",
                left: "-10%",
                color: "gray",
              }}
              size={30}
              data-testid="FaChevronLeft1"
            />
          )}
          <Image
            src={"https://i.postimg.cc/Hknv0FZJ/Tilda-Icons-doctor.png"}
            alt="icon"
            width={40}
            height={40}
          />
          <p>Команда квалифицированных специалистов</p>
        </div>
        <div
          style={{
            transform: isClicked.isClicked2
              ? "translateX(-84%)"
              : "translateX(0%)",
            transition: "transform 0.5s ease",
          }}
        >
          {isMobile && (
            <FaChevronLeft
              onClick={() => {
                handleClick("isClicked2");
              }}
              style={{
                transform: isClicked.isClicked2
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
                position: "absolute",
                top: "30%",
                left: "-10%",
                color: "gray",
              }}
              size={30}
              data-testid="FaChevronLeft2"
            />
          )}
          <Image
            src={"https://i.postimg.cc/C54rJ0p8/chair.png"}
            alt="icon"
            width={30}
            height={40}
          />
          <p>3 стоматологических кабинета</p>
        </div>
        <div
          style={{
            transform: isClicked.isClicked3
              ? "translateX(-84%)"
              : "translateX(0%)",
            transition: "transform 0.5s ease",
          }}
        >
          {isMobile && (
            <FaChevronLeft
              onClick={() => {
                handleClick("isClicked3");
              }}
              style={{
                transform: isClicked.isClicked3
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
                position: "absolute",
                top: "30%",
                left: "-10%",
                color: "gray",
              }}
              size={30}
              data-testid="FaChevronLeft3"
            />
          )}
          <Image
            src={"https://i.postimg.cc/Zq1Q5jLW/loco.png"}
            alt="icon"
            width={25}
            height={40}
          />
          <p>Удобное расположение</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <section className={`${s.header__container}`}>
        <div className={`${s.header__row} ${s.header__row_left}`}>
          <Image
            src="https://i.postimg.cc/GhbQy2xP/Screenshot-5.png"
            alt="mirastom"
            width={150}
            height={50}
            style={{ marginLeft: "30px" }}
          />
          <div className={`${s.title} ${s.header__title}`}>
            <span
              className={`${s.title} ${s.header__title_item} ${s.animated}`}
            >
              {doctor.sirname}
            </span>
            <span
              className={`${s.title} ${s.header__title_item} ${s.animated}`}
            >
              {doctor.fullname}
            </span>
            <span
              className={`${s.title} ${s.header__title_item} ${s.header__title_item_background} ${s.animated}`}
            >
              {doctor.proff}
            </span>
          </div>
        </div>
        <div className={`${s.header__row} ${s.header__row_center}`}>
          <div className={s.images_container}>
            <Image
              src={doctor.avatar[0].url}
              alt={doctor.avatar[0].url}
              width={480}
              height={640}
              className={s.main_image}
              priority={true}
              as="image"
              rel="preload"
            />
          </div>
        </div>
        {headerRowRightContent(isMobile, isSmallTablet, isTablet, isDesktop)}
      </section>
      <section className={s.text_block}>
        <h1>О враче</h1>
        <h3>{heading}</h3>
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>
      <div></div>
    </>
  );
};

export default DetailDoctor;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`doctors/${id}`);
  return {
    props: {
      doctor: res.doctor,
    },
  };
}
