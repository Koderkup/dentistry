import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import s from "../../styles/DoctorPerson.module.scss";
import ViewLink from "../ViewLink";
import AdminLink from "../AdminLink";
const DoctorPerson = ({ doctor }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  
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
          ? ViewLink(`doctors/${doctor.id}`)
          : null}
        <div className="d-flex flex-column mx-0" style={{ gap: "8px" }}>
          {auth.user && auth.user.role === "admin" ? (
            <AdminLink
              url={`doctors/create/${doctor.id}`}
              content={doctor}
              type={"ADD_DOCTOR"}
              header={doctor.sirname}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DoctorPerson;
