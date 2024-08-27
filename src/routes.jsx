import DashboardLayout from "./Layout/DashboardLayout/DashboardLayout.jsx";
import AuthLayout from "./Layout/AuthLayout/AuthLayout.jsx";
import MissingData from "./Pages/MissingData/MissingData.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import DetermineLags from "./Pages/DetermineLags/DetermineLags.jsx";
import MatrixCorrelation from "./Pages/MatrixCorrelation/MatrixCorrelation.jsx";
import Mvmd from "./Pages/Mvmd/Mvmd.jsx";
import FeatureSelection from "./Pages/FeatureSelection/FeatureSelection.jsx";
import MLMethods from "./Pages/MLMethods/MLMethods.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { Navigate } from "react-router-dom";
const routes = [
  // dashboard Layout routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="missingdata" /> },
      { path: "missingdata", element: <MissingData /> },
      { path: "determinelags", element: <DetermineLags /> },
      { path: "matrixcorrelation", element: <MatrixCorrelation /> },
      { path: "mvmd", element: <Mvmd /> },
      { path: "featureselection", element: <FeatureSelection /> },
      { path: "mLmethods", element: <MLMethods /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // Auth Layout routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "/", element: <Login /> }, // Default route for AuthLayout
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
