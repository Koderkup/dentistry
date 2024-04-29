import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "../styles/ArticlesSlider.module.scss";
import { DataContext } from "@/store/GlobalState";
import ArticlesSliderItem from "./ArticlesSliderItem";

const ArticlesSlider = () => {
  const { state } = useContext(DataContext);
  const { articles } = state;
  return (
    <>
      <h2>Полезные статьи</h2>
      <Link
        href={"/articles"}
        className="float-end"
        style={{ fontSize: "16px" }}
      >
        Архив статей
      </Link>
      <div
        className={`${s.ArticlesSlider} container`}
        data-testid="article-slider"
      >
        {articles.map((article) => (
          <ArticlesSliderItem key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};

export default ArticlesSlider;
