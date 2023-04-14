import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Root from './routes/root';
import Repos from './routes/repos';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "profile/:username",
    element: <Repos />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
