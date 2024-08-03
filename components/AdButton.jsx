import Link from "next/link";
import Image from "next/image";
import { typography } from "@/utils/typography";
const AdButton = (props) => {
  const {A} = typography;
  const handleClick =(e)=>{
    e.preventDefault()
    if(props.onClick){
      props.onClick();
    } else{
      window.location.href = props.link;
    }
  }
  return (
    <button type="button" className={`btn btn-light`} style={props.style} onClick={handleClick}>
      <Image src={props.image} width={50} height={50} alt="dental_care" />
      <Link href={props.link} style={A}>{props.title}</Link>
    </button>
  );
};

export default AdButton;
