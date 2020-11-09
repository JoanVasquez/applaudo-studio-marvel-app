import React from "react";
import "./footer.scss";
import Cookies from "universal-cookie";

export const Footer = React.memo(() => {
  const cookie = new Cookies();
  return (
    <footer className="p-4 mt-5 main-footer">
      <div className="container p-4">
        <div className="row">
          <img
            className="d-inline"
            src={cookie.get("logo")}
            alt="logo"
            width="60"
          />
          <ul className="nav justify-content-center mx-auto ">
            <li className="nav-item ml-3 mr-3">
              <span className="nav-link text-white text-uppercase">
                PRIVACY OF POLITIC
              </span>
            </li>
            <li className="nav-item ml-3 mr-3">
              <span className="nav-link text-white text-uppercase">
                TERMS AND CONDICTIONS
              </span>
            </li>
          </ul>
        </div>
      </div>
      <hr className="bg-white" />
      <p className="text-center text-white">
        © 2019 Powered by Joan Vasquez. All Rights Reserved.
      </p>
    </footer>
  );
});
