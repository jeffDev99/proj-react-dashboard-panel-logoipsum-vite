import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../var.css";
import "./TopBar.css";

export default function TopBar() {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [isOpenNotifications, setIsOpenNotifications] = useState(null);

  // const openMyAcc = Boolean(anchorEl);
  // const openNotifications = Boolean(isOpenNotifications);

  // const handleOpenMyAcc = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleCloseMyAcc = () => {
  //   setAnchorEl(null);
  // };
  // const handleOpenNotifications = (event) => {
  //   setIsOpenNotifications(event.currentTarget);
  // };
  // const handleCloseNotifications = () => {
  //   setIsOpenNotifications(null);
  // };
  return (
    <>
      {/*main header*/}
      <header className="row align-items-center main-header">
        <div className="col-6 col-md-8" >
          <h2 className="main-header__title d-none d-lg-block">dashboard</h2>
          <img src="images/Logo.svg" className="aside-header__img d-block d-lg-none" />
        </div>
        <div className="col-6 col-md-4">
          <Link to={"/login"} className="main-header__left text-decoration-none d-flex align-items-center flex-row justify-content-end">
            <figure className="main-header__avatar m-0">
              <img src="/images/blank-profile-picture-973460_960_720.webp" alt="main header icon" className="main-header__icon-img header-image" />
            </figure>
            <p className="main-header-text flex-column justify-content-between d-none d-lg-flex">
              <span className="main-header-text__title">Oliver Reed</span>
              <span className="main-header-text__subtitle">Admin</span>
            </p>
          </Link>
        </div>
      </header>
    </>
  );
}
