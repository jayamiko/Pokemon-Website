import React from "react";
import { Alert } from "react-bootstrap";

function AlertNotification({ text, variant }) {
  return (
    <Alert variant={variant} className="w-full">
      {text}
    </Alert>
  );
}

export default AlertNotification;
