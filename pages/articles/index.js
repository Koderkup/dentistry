import React from "react";
import dataArticles from "@/data/dataArticles";
import s from '../../styles/Articles.module.scss'
import ArticleCard from "@/components/ArticleCard";

function Articles() {
  return <div className={s.article}>
   { dataArticles.map((item, i) => (
      <ArticleCard key={i} order={item.id}/>
    ))}
  </div>;
}

export default Articles;
