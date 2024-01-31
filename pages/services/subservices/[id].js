import { useRouter } from "next/router";
import Image from "next/image";
import s from "../../../styles/SubservicePage.module.scss";
import { getData } from "@/utils/fetchData";
const SubservicePage = ({ subservice }) => {
  const router = useRouter();
  console.log(subservice);
  return (
    <div className="container">
      <h1>{subservice[0].subtitle}</h1>
      <Image
        src={subservice[0].subimage[0].url}
        alt="subservice title"
        width={200}
        height={200}
        className="float-right"
      />
      <p style={{width: '60%'}}>{subservice[0].article}</p>
    </div>
  );
};

export default SubservicePage;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`subservices/${id}`);
  return {
    props: {
      subservice: res.subservice,
    },
  };
}
