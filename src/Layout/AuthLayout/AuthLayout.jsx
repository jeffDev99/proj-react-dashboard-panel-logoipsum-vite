import React from "react";
import { Outlet } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";
import { useNavigate } from 'react-router-dom';
import "./AuthLayout.css";

export default function AuthLayout() {
  const navigate = useNavigate();
  return (
    <>
      <header className="authLayout-header">
        <a onClick={() => navigate(-1)} className="authLayout-header__link">
          <ArrowLeft variant="Outline" className="authLayout-header__icon" />
        </a>
      </header>
      <main className="authLayout-main">{<Outlet />}</main>
    </>
  );
}
