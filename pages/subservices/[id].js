import Image from "next/image";
import Link from "next/link";
import s from "../../styles/SubservicePage.module.scss";
import { getData } from "@/utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import AdButton from "@/components/AdButton";
import { typography } from "@/utils/typography";
const SubservicePage = ({ subservice, directions }) => {
console.log(directions)
  const {
    ADD_SUBSERVICE,
    SUBSEVICE_LINK,
    SUBSERVICE_IMAGE,
    ADD_CONTENT_STYLE,
  } = typography;
  const adminLink = (id, title) => {
    return (
      <div className={s.admin_link}>
        <Link
          href={`/subservices/create/${id}`}
          className="btn btn-info"
          style={{ width: "160px", margin: "5px" }}
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
                  id: id,
                  title: title,
                  type: "DELETE_SERVICE",
                },
              ],
            })
          }
          style={{ width: "160px", margin: "5px" }}
        >
          Удалить
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>{subservice[0].title}</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <p>{subservice[0].description}</p>
          </div>
        </div>
        <div className="row">
          <h2>{subservice[0].subtitle}</h2>
        </div>
        <div className="row">
          <Image
            src={subservice[0].subimage[0].url}
            alt="subservice title"
            width={200}
            height={300}
            className={`float-right col-lg-3 col-md-6 col-sm-12`}
            style={{ margin: "auto", borderRadius: "50%" }}
          />
          <p className={`col-lg-9 col-md-12 col-sm-12`}>
            {subservice[0].article}
          </p>
        </div>
        <div className={`${s.directions} row`}>
            {directions.map((direction) => (
              <div
                key={direction.id}
                className="card text-dark bg-light mb-3 mt-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header mx-auto">
                  <Image
                    src={direction.dirimage[0].url}
                    alt="icon-of-service"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{direction.dirtitle}</h5>
                  <p className="card-text">
                  </p>
                </div>
              </div>
            ))}
        </div>

        <button
          className="btn btn-info mt-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          Изменить подуслугу
        </button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              {subservice[0].subtitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {adminLink(subservice[0].id, subservice.title)}
          </div>
        </div>
      </div>
      <AdButton
        title={ADD_SUBSERVICE}
        link={SUBSEVICE_LINK}
        image={SUBSERVICE_IMAGE}
        style={ADD_CONTENT_STYLE}
      />
    </>
  );
};

export default SubservicePage;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`subservices/${id}`);
  const dir = await getData(`subservice-direction/${id}`);
  return {
    props: {
      subservice: res.subservice,
      directions: dir.subServiceDirections,
    },
  };
}
