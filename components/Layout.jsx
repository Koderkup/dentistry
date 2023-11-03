import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
const Layout = ({ children }) => {
  return (
    <>
    <Meta/>
      <Header />
      {children}
      <Footer/>
    </>
  );
};

export default Layout;
