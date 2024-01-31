import Link from "next/link";
import Image from "next/image";
import { typography } from "@/utils/typography";
const AdButton = (props) => {
  const {A} = typography;
  return (
    <button type="button" className={`btn btn-light`} style={props.style}>
      <Image src={props.image} width={50} height={50} alt="dental_care" />
      <Link href={props.link} style={A}>{props.title}</Link>
    </button>
  );
};

export default AdButton;
