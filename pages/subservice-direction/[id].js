import Image from "next/image";
import Link from "next/link";
import s from "../../styles/SubservicePage.module.scss";
import { getData } from "@/utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import AdButton from "@/components/AdButton";
import { typography } from "@/utils/typography";
const SubserviceDirectionPage = ({ subdirection }) => {
  const {
    ADD_SUBDIRSERVICE,
    SUBDIRSEVICE_LINK,
    SUBDIRSERVICE_IMAGE,
    ADD_CONTENT_STYLE,
  } = typography;
  const adminLink = (id, title) => {
    return (
      <div className={s.admin_link}>
        <Link
          href={`/subservice-direction/create/${id}`}
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
          <h1>{subdirection[0].dirtitle}</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <p style={{ textAlign: "justify" }}>
              {subdirection[0].description}
            </p>
          </div>
        </div>
        <div className="row">
          <h2>{subdirection[0].subtitle}</h2>
        </div>
        <div className="row">
          <Image
            src={subdirection[0].dirimage[0].url}
            alt="subdirection title"
            width={200}
            height={300}
            className={`float-right col-lg-3 col-md-4 col-sm-12 ${s.image_subservice}`}
            style={{ margin: "auto", borderRadius: "50%" }}
          />
          <p
            className={`col-lg-8 col-md-12 col-sm-12`}
            style={{ textAlign: "justify" }}
          >
            {subdirection[0].dirarticle}
          </p>
        </div>

        <button
          className="btn btn-info mt-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          Изменить напр/подуслуги
        </button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              {subdirection[0].dirtitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {adminLink(subdirection[0].id, subdirection.dirtitle)}
          </div>
        </div>
      </div>
      <AdButton
        title={ADD_SUBDIRSERVICE}
        link={SUBDIRSEVICE_LINK}
        image={SUBDIRSERVICE_IMAGE}
        style={ADD_CONTENT_STYLE}
      />
    </>
  );
};

export default SubserviceDirectionPage;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`subservice-direction/subdirection/${id}`);
  return {
    props: {
      subdirection: res.subServiceDirection,
    },
  };
}
