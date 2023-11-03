import { useRouter } from "next/router";
import ArticleCard from "@/components/ArticleCard";
const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <ArticleCard order={slug} />
    </>
  );
};

export default ArticlePage;
