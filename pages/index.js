import { useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { getData } from "../utils/fetchData";
import s from "../styles/Home.module.scss";
import { DataContext } from "../store/GlobalState";
import { typography } from "@/utils/typography";
import ArticlesSlider from "@/components/ArticlesSlider";
const inter = Inter({ subsets: ["latin"] });

const DoctorPerson = dynamic(() => import("@/components/doctor/DoctorPerson"));
const Welcom = dynamic(() => import("@/components/Welcom"));
const ActionAd = dynamic(() => import("@/components/action/ActionAd"));
const AdButton = dynamic(() => import("@/components/AdButton"));

function Home({ doctorProps, widgetsProps }) {
  const [doctors, setDoctors] = useState(doctorProps);
  const { state, dispatch } = useContext(DataContext);
  const [widgets, setWidgets] = useState(widgetsProps);
  const { auth } = state;
  const { ADD_DOCTOR, DOCTOR_IMAGE, DOCTOR_LINK, ADD_CONTENT_STYLE } =
    typography;
  return (
    <>
      <div className="container">
        <ActionAd widgets={widgets}/>
      </div>
      <Welcom />
      <div className={`${s.doctor_wrapper}`}>
        <h2>Наши специалисты</h2>
        <div className={s.doctors_list}>
          {doctors.map((doctor, i) => (
            <DoctorPerson key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
      <div className={'container'}>
        <ArticlesSlider/>
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
