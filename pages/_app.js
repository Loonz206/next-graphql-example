import React from "react";
import "../src/styles/globals.scss";

// eslint-disable-next-line react/prop-types
function app({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default app;
