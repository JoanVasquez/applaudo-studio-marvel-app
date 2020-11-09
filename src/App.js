import React from "react";
import { useRoutes } from "hookrouter";
import { router } from "./routes";
import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Error404 } from "./views/404/Error404";
import "./App.scss";
import { CookieBanner } from "./components/cookie-banner/CookieBanner";
import lozad from "lozad";

const App = () => {
  const observer = lozad();
  observer.observe();
  const routeResult = useRoutes(router);

  return (
    <main id="wrapper">
      <Navbar />
      <Header />
      <section className="content">{routeResult || <Error404 />}</section>
      <Footer />
      <CookieBanner />
    </main>
  );
};

export default App;
