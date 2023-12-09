import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/store/GlobalState";

const ArticleCard = ({ id }) => {
  const { state } = useContext(DataContext);
  const { articles, auth } = state;
  const [content, setContent] = useState({});
  useEffect(() => {
    const filling = articles.filter((article) => article.id === Number(id));
    setContent(filling[0]);
  }, [id]);
  if (!content || !content.image) {
    return null;
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
            <p className="card-text">{content.content}</p>
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
              style={{ color: "white", textDecoration: 'none' }}
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
};

export default ArticleCard;
