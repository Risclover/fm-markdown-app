import React, { SetStateAction } from "react";
import "./WarningMessage.css";

type Props = {
  children: any;
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
};

export default function WarningMessage({
  children,
  setShowDeleteWarning,
}: Props) {
  return (
    <div className="warning-message-container">
      <div
        className="warning-message-background"
        onClick={() => setShowDeleteWarning(false)}
      ></div>
      <div className="warning-message">{children}</div>
    </div>
  );
}
