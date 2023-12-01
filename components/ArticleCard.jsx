import Image from "next/image";
import { useEffect, useState } from "react";
import dataArticles from "@/data/dataArticles";
const ArticleCard = ({ order }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const filling = dataArticles.filter((article) => article.id === order);
    setContent(filling[0]);
  }, [order]);
  if (!content || !content.imageUrl) {
    return null;
  }
  return (
    <div className="card" style={{ margin: "12px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <Image
            src={content.imageUrl}
            className="card-img"
            alt="kind of service"
            width={300}
            height={300}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title" style={{ textAlign: "center" }}>
              {content.title}
            </h3>
            <p className="card-text">{content.article}</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
