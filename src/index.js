import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <div>Ooopss!!! looks like you are lost</div>
  },
  {
    path: "profile/:username",
    element: <div>Fetching github profile data...</div>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
