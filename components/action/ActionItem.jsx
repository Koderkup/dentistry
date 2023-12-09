import {useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";
import s from '../../styles/ActionItem.module.scss'
import { DataContext } from "@/store/GlobalState";
function ActionItem({action}) {

  const { state } = useContext(DataContext);
  const { articles, auth } = state;


  if (!action || !action.image || !action.title || !action.info)
    return <Loading />;
  return (
    <div style={{ margin: "10px auto", maxWidth: "1000px", border: '2px solid white' }}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{action.title}</h3>
          <h5 className="card-text">{action.info}</h5>
          <p className="card-text">
            <small className="text-muted">Mirastom</small>
          </p>
        </div>
        <Image
          src={action.image[0].url}
          className={`card-img-bottom ${s.action_image}`}
          alt="action_banner"
          width={600}
          height={700}
        />
      </div>
      {auth.user && auth.user.role === "admin" && (
        <div
          className="d-flex justify-content-around"
          style={{ padding: "4%" }}
        >
          <button
            type="button"
            className="btn btn-info"
            style={{ maxWidth: "200px" }}
          >
            <Link
              href={`/actions/create/${action.id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Обновить
            </Link>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ maxWidth: "150px" }}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionItem;
