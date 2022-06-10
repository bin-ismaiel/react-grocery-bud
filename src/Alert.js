import React, { useEffect } from "react";

const Alert = ({ msg, type }) => {
  return <p class={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
