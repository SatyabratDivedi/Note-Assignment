import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NoteTextArea from "./components/NoteTextArea.jsx";

import {store} from "./reduxStore/store";
import {Provider} from "react-redux";
import Errorpage from "./components/ErrorPage.jsx";
import NoteArea from "./components/NoteArea.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <NoteArea />,
      },
      {
        path: ":groupName",
        element: <NoteTextArea />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
