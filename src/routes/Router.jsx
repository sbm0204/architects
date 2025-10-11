import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlertStatusCards from "../components/AlertStatusCards/AlertStatusCards.jsx";
import GuideLine from "../components/guideLine/GuideLine.jsx";
import Service from "../components/service/Service.jsx";
import Main from "../components/Main.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/alertStatus',
    element: <AlertStatusCards />,
  },
  {
    path: '/guideLine',
    element: <GuideLine />,
  },
  {
    path: '/service',
    element: <Service />,
  },
])

function Router() {
  return <RouterProvider router={router} />
};

export default Router;