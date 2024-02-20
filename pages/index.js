import { useContext } from "react";
import { Inter } from "next/font/google";
import { useState } from "react";
import { getData } from "../utils/fetchData";
import DoctorPerson from "@/components/doctor/DoctorPerson";
import s from "../styles/Home.module.scss";
import { DataContext } from "../store/GlobalState";
import Welcom from "@/components/Welcom";
import ActionAd from "@/components/action/ActionAd";
import AdButton from "@/components/AdButton";
import { typography } from "@/utils/typography";
const inter = Inter({ subsets: ["latin"] });

function Home({ doctorProps, widgetsProps }) {
  const [doctors, setDoctors] = useState(doctorProps);
  const { state, dispatch } = useContext(DataContext);
  const [widgets, setWidgets] = useState(widgetsProps);
  const { auth } = state;
  const { ADD_DOCTOR, DOCTOR_IMAGE, DOCTOR_LINK, ADD_CONTENT_STYLE } =
    typography;
  return (
    <>
      <div style={{ padding: "1%" }}>
        <ActionAd widgets={widgets}/>
      </div>
      <Welcom />
      <div className={`${s.doctor_wrapper}`}>
        <h1>Наши специалисты</h1>
        <div className={s.doctors_list}>
          {doctors.map((doctor, i) => (
            <DoctorPerson key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
      {auth.user && auth.user.role === "admin" && (
        <AdButton
          title={ADD_DOCTOR}
          link={DOCTOR_LINK}
          image={DOCTOR_IMAGE}
          style={ADD_CONTENT_STYLE}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await getData("doctors");
  const query = await getData('widgets');
  return {
    props: {
      doctorProps: res.doctors,
      widgetsProps: query.widgets,
      results: res.result,
    },
  };
}

export default Home;
