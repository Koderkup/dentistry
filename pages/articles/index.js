import {useContext} from "react";
import Link from 'next/link';
import { DataContext } from "@/store/GlobalState";
import s from '../../styles/Articles.module.scss'
import ArticleCard from "@/components/ArticleCard";
import AdButton from "@/components/AdButton";
import { typography } from "@/utils/typography";
function Articles() {
   const { state, dispatch } = useContext(DataContext);
   const {articles, auth} = state;
  const {ADD_ARTICLE, ARTICLE_LINK, ARTICLE_IMAGE, ADD_CONTENT_STYLE} = typography;
  return (
    <>
      <div className={s.article}>
        {articles.map((article, i) => (
          <ArticleCard key={i} content={article} />
        ))}
      </div>
      {auth.user && auth.user.role === "admin" && (
        <AdButton
          title={ADD_ARTICLE}
          link={ARTICLE_LINK}
          image={ARTICLE_IMAGE}
          style={ADD_CONTENT_STYLE}
        />
      )}
    </>
  );
}

export default Articles;
