import React from "react";
import { A } from "hookrouter";
import { navRoutes } from "../../routes";
import Cookies from "universal-cookie";

export const Navbar = React.memo(() => {
  const cookie = new Cookies();
  if (!cookie.get("logo")) {
    cookie.set("logo", "/assets/images/logo.ico", { path: "/" });
  }
  return (
    <nav
      style={{ zIndex: 1001 }}
      className="navbar main-nav navbar-expand-lg navbar-dark bg-dark position-fixed w-100"
    >
      <A className="navbar-brand" href="/" aria-label="logo">
        <img src={cookie.get("logo")} alt="logo" width="40" />
      </A>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {navRoutes.map((route, key) => {
            return (
              <li key={key} className="nav-item">
                <A className="nav-link" key={key} href={route.path}>
                  {route.name}
                </A>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
});
