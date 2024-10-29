import React, { SetStateAction } from "react";
import "./WarningMessage.css";

type Props = {
  children: any;
  setShowWarning: React.Dispatch<SetStateAction<boolean>>;
};

export function WarningMessage({ children, setShowWarning }: Props) {
  return (
    <div className="warning-message-container">
      <div
        className="warning-message-background"
        onClick={() => setShowWarning(false)}
      ></div>
      <div className="warning-message">{children}</div>
    </div>
  );
}
