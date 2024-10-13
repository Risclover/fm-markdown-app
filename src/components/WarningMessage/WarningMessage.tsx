import React from "react";
import "./WarningMessage.css";

type Props = {
  children: any;
};
export default function WarningMessage({ children }: Props) {
  return (
    <div className="warning-message-container">
      <div className="warning-message-background"></div>
      <div className="warning-message">{children}</div>
    </div>
  );
}
