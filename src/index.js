import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Suspense fallback={<h4> Loading...</h4>}>
      <App />
    </Suspense>
  </>
);
