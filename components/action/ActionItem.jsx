import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";
import s from "../../styles/ActionItem.module.scss";
import { DataContext } from "@/store/GlobalState";
function ActionItem({ action }) {
  const { state, dispatch } = useContext(DataContext);
  const { articles, auth } = state;
  const [lasting, setLasting] = useState("");
  const [buttonVision, setButtunVision] = useState(false);
  useEffect(() => {
    let date = new Date(action.timestamp);
    date.setMonth(date.getMonth() + 1);
    setLasting(date.toLocaleDateString());
  }, []);
  const adminLink = (id, title, item) => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
          href={`/actions/create/${action.id}`}
          className="btn btn-info"
          style={{ width: "160px", margin: "5px" }}
        >
          Редактировать
        </Link>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: [item],
                  id: id,
                  title: title,
                  type: "ADD_ACTION",
                },
              ],
            })
          }
          style={{ width: "160px", margin: "5px" }}
        >
          Удалить
        </button>
      </div>
    );
  };

  const handleClick = () => {
    setButtunVision(!buttonVision);
  };

  if (!action || !action.image || !action.title || !action.info)
    return <Loading />;
  return (
    <div className={`card ${s.action_card}`} style={{ width: "18rem" }}>
      <Image
        // src={action.image[0].url}
        src={'./assets/logo_mirastom.svg'}
        className="img-fluid rounded-start rounded-end"
        alt="action_image"
        width={120}
        height={120}
        style={{ margin: 'auto' }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ maxHeight: "96px" }}>
          {action.title}
        </h5>
        <p className={`card-text ${s.action_text}`}>{action.info}</p>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item"
            style={{ borderRadius: "40px", color: "red" }}
          >
            Акция закончится {lasting}
          </li>
        </ul>
      </div>
      <div className="card-body" style={{ maxHeight: "96px" }}>
        {auth.user && auth.user.role === "admin" && (
          <Image
            src={"./assets/setting.svg"}
            width={30}
            height={30}
            alt="wheel"
            onClick={handleClick}
            style={{ marginTop: "20px" }}
          />
        )}
        {auth.user &&
          auth.user.role === "admin" &&
          buttonVision &&
          adminLink(action.id, action.title, action)}
      </div>
    </div>
  );
}

export default ActionItem;
