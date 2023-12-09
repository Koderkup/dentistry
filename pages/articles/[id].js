import { useRouter } from "next/router";
import ArticleCard from "@/components/ArticleCard";
import {useEffect, useContext, useState } from 'react';
import { DataContext } from "@/store/GlobalState";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <ArticleCard id={id} />
    </>
  );
};

export default ArticlePage;
