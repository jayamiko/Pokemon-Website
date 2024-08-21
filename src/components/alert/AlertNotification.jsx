import React from "react";
import { Alert } from "react-bootstrap";

function AlertNotification({ text, variant }) {
  return <Alert variant={variant}>{text}</Alert>;
}

export default AlertNotification;
