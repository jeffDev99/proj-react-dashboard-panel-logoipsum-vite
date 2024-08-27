import React from 'react'
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar.jsx";
import TopBar from "../../Components/TopBar/TopBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardLayout.css"

export default function DashboardLayout() {
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col-12 col-lg-10">
          <TopBar />
          <main className="main">{<Outlet/>}</main>
        </div>
      </div>
    </div>
  </>
  )
}
