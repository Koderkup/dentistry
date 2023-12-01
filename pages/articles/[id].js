import { useRouter } from "next/router";
import ArticleCard from "@/components/ArticleCard";
const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <ArticleCard order={id} />
    </>
  );
};

export default ArticlePage;
