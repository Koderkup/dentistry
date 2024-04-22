import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import ArticleCard from "@/components/ArticleCard";
import { DataContext } from "@/store/GlobalState";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const { articles } = state;
  const [content, setContent] = useState({});
 useEffect(() => {
     const filling = articles.filter((article) => article.id === Number(id));
     setContent(filling[0]); 
 }, [id, articles]);

  return (
    <>
      <ArticleCard content={content} />
    </>
  );
};

export default ArticlePage;
