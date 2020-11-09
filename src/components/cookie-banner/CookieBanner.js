import React, { useState } from "react";
import Cookies from "universal-cookie";

export const CookieBanner = React.memo(() => {
  const cookie = new Cookies();
  const [isCookieAccepted, setCookie] = useState(cookie.get("acceptcookies"));

  const onAcceptCookies = () => {
    cookie.set("acceptcookies", true, { path: "/" });
    setCookie(true);
  };

  return isCookieAccepted ? null : (
    <div className="bg-dark w-100 text-center text-white p-4">
      This sites use cookies, are you okey with it?
      <button
        onClick={onAcceptCookies}
        type="button"
        className=" ml-3 btn btn-success"
      >
        Yes
      </button>
    </div>
  );
});
