import React from "react";

export const NoFound = React.memo(() => {
  return (
    <article className="container mt-3 d-flex justify-content-center ">
      <section className="row">
        <div className="col-12">
          <img
            src="/assets/images/404.png"
            alt="No Found"
            className="rounded lozad"
          />
        </div>
      </section>
    </article>
  );
});
