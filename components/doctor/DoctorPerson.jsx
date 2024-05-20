import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import s from "../../styles/DoctorPerson.module.scss";
import { typography } from "@/utils/typography";
const DoctorPerson = ({ doctor }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const {LINK_MOREINFO_COLOR} = typography;
  const doctorLink = () => {
    return (
      <>
        <Link
          href={`doctors/${doctor.id}`}
          className="btn btn-info flex-fill"
          style={{
            marginRight: "5px",
            flex: 1,
            color: "white",
            backgroundColor: LINK_MOREINFO_COLOR,
            maxHeight: '37.8px'
          }}
        >
          Узнать больше
        </Link>
      </>
    );
  };
  const adminLink = () => {
    return (
      <>
        <Link
          href={`doctors/create/${doctor.id}`}
          className="btn btn-info flex-fill"
        >
          Редактактировать
        </Link>
        <button
          className="btn btn-danger flex-fill"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: [doctor],
                  id: doctor.id,
                  title: doctor.sirname,
                  type: "ADD_DOCTOR",
                },
              ],
            })
          }
        >
          Удалить
        </button>
      </>
    );
  };
  return (
    <div className={`card ${s.doctor_person}`} style={{ width: "19rem" }}>
      <Image
        src={doctor.avatar[0].url}
        className="card-img-top"
        alt="doctor`s photo"
        width={300}
        height={380}
        style={{ border: "3px solid white" }}
      />
      <div className="card-body d-flex flex-column justify-content-between align-items-center">
        <h5 className="card-title text-center">{doctor.sirname}</h5>
        <h6 className="card-title text-center">{doctor.fullname}</h6>
        <p className="card-text text-center">{doctor.proff}</p>
        {!auth.user || (auth.user && auth.user.role !== "admin")
          ? doctorLink()
          : null}
        <div className="d-flex flex-column mx-0" style={{ gap: "8px" }}>
          {auth.user && auth.user.role === "admin" ? adminLink() : null}
        </div>
      </div>
    </div>
  );
};

export default DoctorPerson;
