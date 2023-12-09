import {useState, useContext} from "react";
import Link from 'next/link';
import ActionItem from "@/components/action/ActionItem";
import { getData } from "@/utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import s from '../../styles/Action.module.scss'
const Actions = ({ actionProps }) => {
  const [actions, setActions] = useState(actionProps);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  return (
    <div className="container">
      {auth.user && auth.user.role === "admin" && (
        <div
          className={`${s.action_create}`}
          style={{
            maxHeight: "150px",
            border: "2px solid white",
            borderRadius: "5px",
            margin: "10px auto",
          }}
        >
          <h3
            className="card-title"
            style={{ textAlign: "center", margin: "auto" }}
          >
            Объявить новую акцию
          </h3>
          <div
            className="d-flex justify-content-around"
            style={{ paddingBottom: "1%", marginTop: "1%" }}
          >
            <button
              type="button"
              className="btn btn-primary"
              style={{ maxWidth: "300px" }}
            >
              <Link
                href={`/actions/create`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Объявить
              </Link>
            </button>
          </div>
        </div>
      )}
      {actions.map((action, i) => (
        <ActionItem key={action.id} action={action} />
      ))}
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