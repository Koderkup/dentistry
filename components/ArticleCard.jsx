import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/store/GlobalState";
import Loading from "@/components/Loading";
import s from "../styles/ArticleCard.module.scss";
import { typography } from "@/utils/typography";
import useFormattingText from "@/hooks/useFormattingText";

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
        {paragraphsWithoutHeding.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {auth.user && auth.user.role === "admin" && (
        <div
          className="d-flex justify-content-around"
          style={{ padding: "4%" }}
        >
          <button className={s.admin_button}>
            <Link href={`/articles/create/${content.id}`}>
              <Image src={EDIT_IMAGE} alt="pencil" width={30} height={30} />
            </Link>
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              dispatch({
                type: "ADD_MODAL",
                payload: [
                  {
                    data: [content],
                    id: content.id,
                    title: content.header,
                    type: "ADD_ARTICLE",
                  },
                ],
              })
            }
            className={s.admin_button}
          >
            <Image src={DELETE_IMAGE} alt="delete" width={30} height={30} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
