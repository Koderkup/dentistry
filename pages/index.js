import { useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { getData } from "../utils/fetchData";
import s from "../styles/Home.module.scss";
import { DataContext } from "../store/GlobalState";
import { typography } from "@/utils/typography";
import ArticlesSlider from "@/components/ArticlesSlider";
const inter = Inter({ subsets: ["latin"] });
import Loading from "@/components/Loading";

const DoctorPerson = dynamic(() => import("@/components/doctor/DoctorPerson"));
const Welcom = dynamic(() => import("@/components/Welcom"));
const ActionAd = dynamic(() => import("@/components/action/ActionAd"));
const AdButton = dynamic(() => import("@/components/AdButton"));

function Home(props) {
  const [doctors, setDoctors] = useState(props.doctorProps);
  const { state, dispatch } = useContext(DataContext);
  const [widgets, setWidgets] = useState(props.widgetsProps);
  const [loading, setLoading] = useState(true);
  const { auth } = state;
  const { ADD_DOCTOR, DOCTOR_IMAGE, DOCTOR_LINK, ADD_CONTENT_STYLE } =
    typography;

  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return <Loading />;
  if (props.error) {
  
    return (
      <h1 style={{color: 'red'}}>Нет соединения с базой данных. Пожалуйста, попробуйте позже.</h1>
    );
  }
  return (
    <>
      <div className="container">
        <ActionAd widgets={widgets} />
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
      <div className={"container"}>
        <ArticlesSlider />
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
  try {
    const res = await getData("doctors");
    const query = await getData("widgets");
    return {
      props: {
        doctorProps: res.doctors,
        widgetsProps: query.widgets,
        results: res.result,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default Home;
