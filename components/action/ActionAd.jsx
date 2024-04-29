'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "../../styles/Action.module.scss";
import { typography } from "@/utils/typography";
import OffsetContent from "../OffsetContent";
const ActionAd = ({ widgets }) => {
  const blurDataURL = "data:image/svg+xml;base64,...";
  const {
    IMAGE_DEFAULT_URL,
    EYE_IMAGE_URL,
    TEXT_INFORM_CARD,
    TITLE_INFORM_CARD,
  } = typography;
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState(
    Array.from(new Set(widgets.map((widget) => widget.type)))
  );
  const [context, setContext] = useState({});
  const [list, setList] = useState([]);
  useEffect(() => {
    contents.forEach((content) => {
      context[content] = widgets.filter(
        (widget) => widget.type === content
      );
    });
  }, []);
  const handleClick = (title, content) => {
    setTitle(title);
    setList(context[content])
  };
  const InformCard = ({ imageSrc, title, text, content }) => {
    return (
      <div className="card mb-3 col-lg-6" style={{ border: "none" }}>
        <div className="row g-0">
          <div
            className="col-md-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={IMAGE_DEFAULT_URL}
              width={100}
              height={100}
              className="img-fluid rounded-start"
              alt="dettistry-icon"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{text}</p>
              <p className="card-text">
                <small className="text-muted">
                  консультация +375(29)813-86-90
                </small>
                <a
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  <Image
                    src={EYE_IMAGE_URL}
                    width={80}
                    height={30}
                    alt="eye"
                    onClick={() => handleClick(title, content)}
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container" style={{ width: "100%" }}>
      <div
        className="card"
        style={{ backgroundColor: "white", border: "none" }}
      >
        <Image
          src="https://i.postimg.cc/fLYqhqzK/action-add-iicf3y.png"
          className="img-fluid"
          alt="action-ad"
          width={900}
          height={600}
          rel="preload"
          as="image"
          blurDataURL={blurDataURL}
          placeholder="blur"
          priority
          style={{ margin: "auto", width: "100%" }}
        />
        <div className={`card-img-overlay ${s.overlay}`}>
          <p className={s.paragraph}>
            <i>
              Улыбайтесь с уверенностью! В клинике Мирастом - доступны акции для
              здоровых и красивых улыбок.
            </i>
          </p>
          <button
            type="button"
            className="btn btn-light"
            style={{
              backgroundColor: "rgba(248,249,250, 0.5)",
              width: "200px",
            }}
          >
            <Link
              href="/actions"
              style={{
                textDecoration: "none",
              }}
            >
              Узнать больше
            </Link>
          </button>
        </div>
      </div>
      <div className={`row ${s.banner}`}>
        {contents.map((content, i) => (
          <InformCard
            key={i}
            title={TITLE_INFORM_CARD[i]}
            imageSrc={IMAGE_DEFAULT_URL}
            text={TEXT_INFORM_CARD[i]}
            content={content}
          />
        ))}
      </div>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            {title}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <OffsetContent list={list} />
        </div>
      </div>
    </div>
  );
};

export default ActionAd;
