import React from "react";

export const Alert = React.memo(({ type, message }) => {
  return (
    <div className={`alert ${type}`} role="alert">
      {message}
    </div>
  );
});
