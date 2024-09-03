import React from "react";
import ReactDOMServer from "react-dom/server";
import SendOrder from "./SendOrder";

const renderEmailOrder = (data) => {
  return ReactDOMServer.renderToStaticMarkup(
    <SendOrder data={data} />
  );
};

export default renderEmailOrder;
