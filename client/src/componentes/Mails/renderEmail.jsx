import React from "react";
import ReactDOMServer from "react-dom/server";
import SaleConfirmationEmail from "./SaleConfirmationEmail";

const renderEmail = (data) => {
  return ReactDOMServer.renderToStaticMarkup(
    <SaleConfirmationEmail data={data} />
  );
};

export default renderEmail;
