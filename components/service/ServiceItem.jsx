import { useContext, useLayoutEffect, useState } from "react";
import s from "../../styles/ServiceItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import { DataContext } from "@/store/GlobalState";
import Loading from "../Loading";
import { typography } from "@/utils/typography";
const ServiceItem = ({ service }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [isDesktop, setIsDesktop] = useState(false)
  const {LINK_MOREINFO_COLOR} = typography;
  useLayoutEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768); 
    }
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const objectFitValue = isDesktop ? 250 : 350;
  const serviceLink = () => {
    return (
      <>
        <Link
          href={`services/${service.id}`}
          className="btn"
          style={{ backgroundColor: LINK_MOREINFO_COLOR, color: "white" }}
        >
          Узнать больше
        </Link>
      </>
    );
  };
  const adminLink = () => {
    return (
      <div className={s.admin_link}>
        <Link
          href={`services/create/${service.id}`}
          className="btn btn-info"
          style={{ width: "160px"}}
        >
          Редактировать
        </Link>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: service.id,
                  title: service.title,
                  type: "DELETE_SERVICE",
                },
              ],
            })
          }
          style={{ width: "160px" }}
        >
          Удалить
        </button>
      </div>
    );
  };

  if (!service || !service.image || !service.title || !service.intro)
    return <Loading />;
  return (
    <div
      className={`card mb-3 ${s.service_item}`}
      style={{ height: "100%", minWidth: "100%" }}
    >
      <div className="row g-0">
        <div className="col-md-4" style={{ padding: "1%" }}>
          <Image
            src={service.image[0].url}
            className="card-img-top img-fluid"
            alt="service`s photo"
            width={400}
            height={objectFitValue}
            objectFit="scale-down"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{service.title}</h5>
             <p className="card-text" style={{ minHeight: "120px" }}>
              {service.intro}
            </p> 
            <div className="card-text">
              {!auth.user || (auth.user && auth.user.role !== "admin")
                ? serviceLink()
                : adminLink()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;

export const ServiceItemDefault = () => {
  return (
    <div
      className={`${s.service_item} ${s.service_default_item}`}
      style={{border: "1px solid gray", maxWidth: '45%', padding: '10px 5px', marginTop: '20px'}}
    >
      <div className="row g-0">
        <div className="col-md-4" style={{ padding: "1%" }}>
          <Image
            src={
              "https://res.cloudinary.com/dlr2olc8r/image/upload/v1697107889/test/mjercerijf4kt5pn2umr.png"
            }
            className="card-img-top"
            alt="service`s photo"
            width={400}
            height={250}
            style={{ border: "1.5px solid gray" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title"></h5>
            <p className="card-text" style={{ minHeight: "120px" }}></p>
            <p className="card-text" style={{ textAlign: "center" }}>
                <Link href={`services/create`} className="btn btn-success" style={{minWidth: '160px'}}>
                  Добавить услугу
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
