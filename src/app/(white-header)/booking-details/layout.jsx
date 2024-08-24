import Footer from "@/components/footer/footer";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default layout;
