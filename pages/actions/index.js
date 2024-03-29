import {useState, useContext} from "react";
import Link from 'next/link';
import Image from 'next/image';
import ActionItem from "@/components/action/ActionItem";
import { getData } from "@/utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import s from '../../styles/Action.module.scss'
import { typography } from "@/utils/typography";
import AdButton from "@/components/AdButton";
const Actions = ({ actionProps }) => {
  const [actions, setActions] = useState(actionProps);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
const {ADD_ACTION, ACTION_IMAGE, ACTION_LINK, ADD_CONTENT_STYLE} = typography;
  return (
    <div className="">
      <div className="row">
        <h2 className={s.promo}>
          Дарите улыбки: подарочные сертификаты на стоматологию для ваших
          близких и друзей!
        </h2>
      </div>
      <div className={`${s.gift}`}>
        <Image
          src="https://i.postimg.cc/fyg6Z6pL/Screenshot-10.png"
          width={450}
          height={450}
          alt="certificat"
          className={` ${s.gift_image}`}
        />
        <ul className={s.colored_marker_list}>
          <li>
            <span style={{ fontSize: "20px" }}>
              Сертификат является именным
            </span>
          </li>
          <li>
            <span style={{ fontSize: "20px" }}>
              Можно заказать услугу дороже, доплатив разницу
            </span>
          </li>
          <li>
            <span style={{ fontSize: "20px" }}>
              При утрате сертификат восстановлению не подлежит
            </span>
          </li>
          <li>
            <span style={{ fontSize: "20px" }}>
              Срок действия — 3 месяца с момента приобретения
            </span>
          </li>
        </ul>
      </div>
      <div className="row">
        <h1 style={{ marginTop: "30px" }}>Акции</h1>
      </div>
      {auth.user && auth.user.role === "admin" && (
        <>
          <AdButton
            title={ADD_ACTION}
            link={ACTION_LINK}
            image={ACTION_IMAGE}
            style={ADD_CONTENT_STYLE}
          />
        </>
      )}
      <div className={s.action_image}></div>
      <div className={s.action_card_container}>
        {actions.map((action, i) => (
          <ActionItem key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
};

export default Actions;
export async function getServerSideProps(context) {
  const res = await getData("actions");
  return {
    props: {
      actionProps: res.actions
    },
  };
}