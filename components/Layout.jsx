import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import Notify from "./Notify";
import Modal from "./Modal";
import { useRouter } from "next/router";
import { metaData } from "@/utils/metaData";

const Layout = ({ children }) => {
  const router = useRouter();
  const currentMeta = metaData[router.pathname] || {
    title: "Стоматология Мирастом",
    description: "Лучшие стоматологические услуги в Витебске.",
    keywords: "стоматология, Витебск, лечение зубов",
  };
  return (
    <div>
      <Meta
        title={currentMeta.title}
        description={currentMeta.description}
        keywords={currentMeta.keywords}
      />
      <Header />
      <Notify />
      <Modal />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
