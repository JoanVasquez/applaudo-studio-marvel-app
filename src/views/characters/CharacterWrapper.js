import React from "react";
import { ToastContainer } from "react-toastify";
import { Alert } from "../../components/alert/Alert";
import { InputFilter } from "../../components/input-filter/InputFilter";
import { Loading } from "../../components/loading/Loading";

export const CharacterWrapper = ({ errors, onFilter, isLoading, children }) => {
  return (
    <article className="container">
      <ToastContainer />
      <h2 className="mt-3">CHARACTERS</h2>
      <InputFilter
        onFilter={onFilter}
        filterByOptions={["name", "comics", "stories"]}
      />
      {errors && (
        <div className="row">
          <div className="col-12">
            <Alert type="alert-danger" className="mt-3" message={errors} />
          </div>
        </div>
      )}
      <section className="row justify-content-center bg-white rounded mt-3 mb-3 pb-3">
        {isLoading === true ? (
          <div className="col-12 text-center">
            <Loading />
          </div>
        ) : (
          children
        )}
      </section>
    </article>
  );
};
