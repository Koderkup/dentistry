import React from "react";
import s from "../styles/ArticlesSlider.module.scss";
import Image from "next/image";
import Link from "next/link";
const ArticlesSliderItem = ({ article }) => {
  return (
    <>
      <div className={s.card_wrapper}>
        <div className={s.image_wrapper}>
          <Image
            src={article.image[0].url}
            width={200}
            height={200}
            className={s.image}
            alt="article-item"
          />
        </div>
        <div className={s.text_wrapper}>
          <h5 className={s.card_title}>{article.header}</h5>
          <p className={`${s.article_content}`}>{article.content}</p>
          <Link href={`/articles/${article.id}`}>
            <small className="text-muted">Читать...</small>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ArticlesSliderItem;
