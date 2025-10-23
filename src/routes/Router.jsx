import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GuideLine from "../components/guideLine/GuideLine.jsx";
import Service from "../components/service/Service.jsx";
import Main from "../components/Main.jsx";
import App from "../App.jsx";
import AlertStatus from "../components/AlertStatus/AlertStatus.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/alertStatus',
        element: <AlertStatus />,
      },
      {
        path: '/guideLine',
        element: <GuideLine />,
      },
      {
        path: '/service',
        element: <Service />,
      },
    ]
  }
  ]);

function Router() {
  return <RouterProvider router={router} />
};

export default Router;