import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "../../styles/SubservicePage.module.scss";
import { getData } from "@/utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import AdButton from "@/components/AdButton";
import { typography } from "@/utils/typography";
import AdminLink from "@/components/AdminLink";
const SubservicePage = ({ subservice, directions }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const {
    ADD_SUBSERVICE,
    SUBSEVICE_LINK,
    SUBSERVICE_IMAGE,
    ADD_CONTENT_STYLE,
    LINK_MOREINFO_COLOR,
  } = typography;

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>{subservice[0].subtitle}</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <p style={{ textAlign: "justify" }}>{subservice[0].description}</p>
          </div>
        </div>
        <div className="row">
          <h2>{subservice[0].subtitle}</h2>
        </div>
        <div className="row">
          <Image
            src={subservice[0].subimage[0].url}
            alt="subservice title"
            width={300}
            height={300}
            className={`float-right col-lg-3 col-md-4 col-sm-12 ${s.image_subservice}`}
            style={{ margin: "auto", borderRadius: "50%" }}
          />
          <p
            className={`col-lg-8 col-md-12 col-sm-12`}
            style={{ textAlign: "justify" }}
          >
            {subservice[0].article}
          </p>
        </div>
        <div className={`${s.directions} row`}>
          {directions.map((direction) => (
            <div
              key={direction.id}
              className={`card mb-3 mt-3 ${s.direction_card}`}
              style={{ maxWidth: "18rem" }}
            >
              <div
                className="card-header mx-auto"
                style={{
                  border: "none",
                  backgroundColor: "rgba(255,255,255,0)",
                }}
              >
                <Image
                  src={"../assets/logo_mirastom.svg"}
                  alt="icon-of-service"
                  width={50}
                  height={50}
                />
              </div>
              <Link
                href={`/subservice-direction/${direction.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "inline",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{direction.dirtitle}</h5>
                  <p className="card-text"></p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {auth.user && auth.user.role === "admin" && (
          <button
            className="btn mt-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            style={{ backgroundColor: LINK_MOREINFO_COLOR }}
          >
            Изменить подуслугу
          </button>
        )}
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
            {(<AdminLink
              url={`/subservices/create/${subservice[0].id}`}
              content={subservice}
              type={"ADD_SUBSERVICE"}
              header={subservice[0].subtitle}
            />)}
          </div>
        </div>
      </div>
      {auth.user && auth.user.role === "admin" && (
        <AdButton
          title={ADD_SUBSERVICE}
          link={SUBSEVICE_LINK}
          image={SUBSERVICE_IMAGE}
          style={ADD_CONTENT_STYLE}
        />
      )}
    </>
  );
};

export default SubservicePage;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`subservices/${id}`);
  const subserviceId = id;
  const dir = await getData(`subservice-direction/${subserviceId}`);
  return {
    props: {
      subservice: res.subservice,
      directions: dir.subServiceDirections,
    },
  };
}
