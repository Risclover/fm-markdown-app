import React, { SetStateAction } from "react";
import WarningMessage from "../WarningMessage";
import { MarkdownFile } from "../../Sidebar/MyDocuments";

type Props = {
  changesSaved: boolean;
  setChangesSaved: React.Dispatch<SetStateAction<boolean>>;
  setShowChangesUnsavedWarning: React.Dispatch<SetStateAction<boolean>>;
  setCurrentFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  setPendingFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  pendingFile: MarkdownFile | null;
};

const ChangesUnsavedWarning = ({
  changesSaved,
  setChangesSaved,
  setShowChangesUnsavedWarning,
  setCurrentFile,
  setPendingFile,
  pendingFile,
}: Props) => {
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

export default ChangesUnsavedWarning;