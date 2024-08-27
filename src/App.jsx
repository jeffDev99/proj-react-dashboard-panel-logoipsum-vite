import React , {useEffect} from "react";
import routes from "./routes.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.css";

export default function App() {
  let navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("authToken")
    if (!token) {
      navigate("/login");
    }
    
  }, [navigate]);

  let router = useRoutes(routes);
  return router
}
