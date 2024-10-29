import React, { SetStateAction } from "react";
import { WarningMessage } from "../WarningMessage";
import type { MarkdownFile } from "../../../types";
import { useFile } from "../../../context";

type Props = {
  changesSaved: boolean;
  setChangesSaved: React.Dispatch<SetStateAction<boolean>>;
  setShowChangesUnsavedWarning: React.Dispatch<SetStateAction<boolean>>;
  setPendingFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  pendingFile: MarkdownFile | null;
};

export const ChangesUnsavedWarning = ({
  setChangesSaved,
  setShowChangesUnsavedWarning,
  setPendingFile,
  pendingFile,
}: Props) => {
  const { setCurrentFile } = useFile();

  const handleContinue = () => {
    setShowChangesUnsavedWarning(false);
    setCurrentFile(pendingFile);
    setPendingFile(null);
    setChangesSaved(true);
  };

  const handleCancel = () => {
    setShowChangesUnsavedWarning(false);
    setPendingFile(null);
  };
  return (
    <WarningMessage setShowWarning={setShowChangesUnsavedWarning}>
      <div className="delete-document-warning">
        <h4>Unsaved Changes!</h4>
        <p>
          Are you sure you would like to open a different document? You have
          unsaved changes, and these will be lost if you continue without
          saving.
        </p>
        <div className="delete-document-btns">
          <button className="reg-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="reg-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </WarningMessage>
  );
};
