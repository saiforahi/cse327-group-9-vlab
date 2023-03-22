import React from "react";

const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));

const DashboardDealer = React.lazy(() =>
  import("../pages/dashboard/DashboardDealer")
);


const routes = [
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/dashboard/dealer",
    exact: true,
    name: "Dashboard",
    component: DashboardDealer,
  },
  {
    path: "/dashboard/settings",
    exact: true,
    name: "Settings",
    component: React.lazy(() => import("../pages/settings/Settings")),
  },
  
];

export default routes;
