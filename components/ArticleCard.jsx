import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/store/GlobalState";
import Loading from "@/components/Loading";
const ArticleCard = ({ content }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  if (!content || !content.image) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="card" style={{ marginTop: "12px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <Image
            src={content.image[0].url}
            className="card-img"
            alt="kind of service"
            width={300}
            height={300}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title" style={{ textAlign: "center" }}>
              {content.header}
            </h3>
            <p className="card-text" style={{ textAlign: "justify" }}>
              {content.content}
            </p>
          </div>
        </div>
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
              href={`/articles/create/${content.id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Обновить
            </Link>
          </button>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              dispatch({
                type: "ADD_MODAL",
                payload: [
                  {
                    data: [content],
                    id: content.id,
                    title: content.header,
                    type: "ADD_ARTICLE",
                  },
                ],
              })
            }
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
