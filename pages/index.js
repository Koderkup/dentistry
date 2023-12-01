import { useContext } from "react";
import { Inter } from "next/font/google";
import { useState } from "react";
import { getData } from "../utils/fetchData";
import DoctorPerson from "@/components/doctor/DoctorPerson";
import { DoctorPersonDefault } from "@/components/doctor/DoctorPerson";
import s from "../styles/Home.module.scss";
import { DataContext } from "../store/GlobalState";
import Welcom from "@/components/Welcom";
import ActionAd from "@/components/ActionAd";
const inter = Inter({ subsets: ["latin"] });

function Home({ doctorProps }) {
  const [doctors, setDoctors] = useState(doctorProps);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  return (
    <>
      <div style={{ backgroundColor: "#DBF0FC", padding: "1%" }}>
        <ActionAd />
      </div>
      <Welcom />
      <div className={`${s.doctor_wrapper}`}>
        <h1>Наши специалисты</h1>
        <div className={s.doctors_list}>
          {doctors.map((doctor, i) => (
            <DoctorPerson key={doctor.id} doctor={doctor} />
          ))}
          {auth.user && auth.user.role === "admin" && <DoctorPersonDefault />}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await getData("doctors");
  return {
    props: {
      doctorProps: res.doctors,
      results: res.result,
    },
  };
}

export default Home;
