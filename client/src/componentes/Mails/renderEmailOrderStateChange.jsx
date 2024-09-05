import React from "react";
import ReactDOMServer from "react-dom/server";
import { SendEmailStateChanged } from "./SendEmailStateChanged";
const renderEmailOrderStateChange = (data) => {
  return ReactDOMServer.renderToStaticMarkup(
    <SendEmailStateChanged data={data} />
  );
};

export default renderEmailOrderStateChange;
