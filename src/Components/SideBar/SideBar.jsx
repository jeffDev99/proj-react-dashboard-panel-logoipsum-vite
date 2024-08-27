import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Notepad2 } from "iconsax-react";
import { Clock } from "iconsax-react";
import { Chart } from "iconsax-react";
import { TickCircle } from "iconsax-react";
import { Chart1 } from "iconsax-react";
import { Book1 } from "iconsax-react";
import "../../var.css";
import "./SideBar.css";

export default function SideBar() {
  return (
    <>
      <aside className="col-12 col-lg-2">
        <div className="aside">
          <div className="aside-header d-none d-lg-flex justify-content-between justify-content-lg-center ">
            <img src="" className="aside-header__open-icon pe-3 d-lg-none" />
            <img src="/images/Logo.svg" className="aside-header__img" />
            <span></span>
          </div>
          <nav className="dashboard-aside-nav">
            <ul className="aside-list list-unstyled m-0 p-0 ">
                <NavLink to={"/dashboard/MissingData"} className="aside-list__link d-flex align-items-center text-decoration-none aside-list__link--acitve ">
                  <Notepad2 variant="Outline" className="aside-list__image" />
                  Missing Data
                </NavLink>
                <NavLink to={"/dashboard/determinelags"} className="aside-list__link d-flex align-items-center text-decoration-none">
                  <Clock variant="Outline" className="aside-list__image" />
                  Determine Logs
                </NavLink>
                <NavLink to={"/dashboard/matrixcorrelation"} className="aside-list__link d-flex align-items-center text-decoration-none">
                  <Chart variant="Outline" className="aside-list__image" />
                  Matrix Correlation
                </NavLink>
                <NavLink to={"/dashboard/featureselection"} className="aside-list__link d-flex align-items-center text-decoration-none">
                  <TickCircle variant="Outline" className="aside-list__image" />
                  Feature Selection
                </NavLink>
                <NavLink to={"/dashboard/mvmd"} className="aside-list__link d-flex align-items-center text-decoration-none">
                  <Chart1 variant="Outline" className="aside-list__image" />
                  Decomposition Using MVMD
                </NavLink>
                <NavLink to={"/dashboard/mLmethods"} className="aside-list__link d-flex align-items-center text-decoration-none">
                  <Book1 variant="Outline" className="aside-list__image" />
                  ML Methods
                </NavLink>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
