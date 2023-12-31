import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import Notify from "./Notify";
import Modal from "./Modal";
const Layout = ({ children }) => {
  return (
    <div>
    <Meta/>
      <Header />
      <Notify />
      <Modal/>
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
