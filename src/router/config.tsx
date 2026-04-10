import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import DashboardPage from "../pages/dashboard/page";
import GeneratingPage from "../pages/generating/page";
import SettingsPage from "../pages/settings/page";
import QRLoginPage from "../pages/qr-login/page";
import PRDPage from "../pages/prd/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <QRLoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/generating",
    element: <GeneratingPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/prd",
    element: <PRDPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
