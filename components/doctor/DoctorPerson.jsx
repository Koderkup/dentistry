import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import s from "../../styles/DoctorPerson.module.scss";

export const DoctorPersonDefault = () => {
  return (
    <div className={`card ${s.doctor_person}`} style={{ width: "19rem" }}>
      <Image
        src={
          "https://res.cloudinary.com/dlr2olc8r/image/upload/v1699090090/test/user_default_x6y6up.png"
        }
        className="card-img-top"
        alt="doctor`s photo"
        width={300}
        height={300}
        style={{ border: "1.5px solid gray" }}
      />
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <Link
          href={`doctors/create`}
          className="btn btn-success"
        >
          Добавить
        </Link>
      </div>
    </div>
  );
};
const DoctorPerson = ({ doctor }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const doctorLink = () => {
    return (
      <>
        <Link
          href={`doctors/${doctor.id}`}
          className="btn btn-info flex-fill"
          style={{ marginRight: "5px", flex: 1 }}
        >
          Узнать больше
        </Link>
      </>
    );
  };
  const adminLink = () => {
    return (
      <>
        <Link href={`create/${doctor.id}`} className="btn btn-info flex-fill">
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
                  data: "",
                  id: doctor.id,
                  title: doctor.sirname,
                  type: "DELETE_DOCTOR",
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
        height={300}
        style={{ border: "1.5px solid gray" }}
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
