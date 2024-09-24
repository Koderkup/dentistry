import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/store/GlobalState";
import Loading from "@/components/Loading";
import s from "../styles/ArticleCard.module.scss";
import { typography } from "@/utils/typography";
import useFormattingText from "@/hooks/useFormattingText";
import AdminLink from "./AdminLink";

const ArticleCard = ({ content }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const { DELETE_IMAGE, EDIT_IMAGE } = typography;
  const { paragraphsWithoutHeding } = useFormattingText(content?.content);

  if (!content || !content.image) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className={s.container_article} data-testid="articleCard">
      <Image
        src={content.image[0].url}
        className={`${s.article_image}`}
        alt="article-peace"
        width={300}
        height={300}
      />

      <h3 className={s.article_title} style={{ textAlign: "center" }}>
        {content.header}
      </h3>
      <div className={s.article_text} style={{ textAlign: "justify" }}>
        {paragraphsWithoutHeding.map((item, i) => {
          const trimmedItem = item.trim();
          const isBold = trimmedItem.startsWith("*");
          const content = isBold ? trimmedItem.slice(1) : trimmedItem;
          return (
            <p
              style={{
                textAlign: "justify",
                fontSize: "1.2rem",
                textIndent: "30px",
              }}
              key={i}
            >
              {isBold ? <b>{content}</b> : content}
            </p>
          );
        })}
      </div>

      {auth.user && auth.user.role === "admin" && (
        <>
          <AdminLink
            url={`/articles/create/${content.id}`}
            content={content}
            type={"ADD_ARTICLE"}
            header={content.header}
          />
        </>
      )}
    </div>
  );
};

export default ArticleCard;
