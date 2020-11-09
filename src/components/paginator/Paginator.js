import React from "react";
import "./paginator.scss";

export const Paginator = React.memo((props) => {
  return (
    <div className="pagination mt-3">
      <a
        href="/#"
        className={`${!props.paginatorData.has_previous_page ? "disable" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          props.onPaginate(props.paginatorData.first_page);
        }}
      >
        First
      </a>
      <a
        href="/#"
        className={`${!props.paginatorData.has_previous_page ? "disable" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          props.onPaginate(props.paginatorData.first_page);
        }}
      >
        &laquo;
      </a>
      {props.pages.map((page, index) => (
        <a
          key={index}
          href="/#"
          className={`${
            !props.paginatorData.has_previous_page &&
            !props.paginatorData.has_next_page
              ? "disable"
              : ""
          } ${props.paginatorData.current_page === page ? "active" : ""}`}
          onClick={(event) => {
            event.preventDefault();
            props.onPaginate(page);
          }}
        >
          {page}
        </a>
      ))}
      <a
        href="/#"
        className={` ${!props.paginatorData.has_next_page ? "disable" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          props.onPaginate(props.paginatorData.next_page);
        }}
      >
        &raquo;
      </a>
      <a
        href="/#"
        className={`${!props.paginatorData.has_next_page ? "disable" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          props.onPaginate(props.paginatorData.last_page);
        }}
      >
        Last
      </a>
    </div>
  );
});
