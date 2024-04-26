import {useContext} from "react";
import Link from 'next/link';
import { DataContext } from "@/store/GlobalState";
import s from '../../styles/Articles.module.scss'
import ArticleCard from "@/components/ArticleCard";

function Articles() {
   const { state, dispatch } = useContext(DataContext);
   const {articles, auth} = state;
  return (
    <div className={s.article}>
      {auth.user && auth.user.role === "admin" && (
        <div
          className={s.article_create}
          style={{
            maxHeight: "150px",
            border: "2px solid white",
            borderRadius: "5px",
          }}
        >
          <h3
            className="card-title"
            style={{ textAlign: "center", margin: "auto" }}
          >
            Создать новую статью
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
              <Link href={`/articles/create`} style={{color: 'white', textDecoration: 'none'}}>Создать</Link>
            </button>
          </div>
        </div>
      )}
      {articles.map((article, i) => (
        <ArticleCard key={i} content={article} />
      ))}
    </div>
  );
}

export default Articles;
