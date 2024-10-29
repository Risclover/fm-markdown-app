import React, { SetStateAction } from "react";
import { useFile } from "../../../context";
import { WarningMessage } from "../WarningMessage";
import { useDeleteDocumentWarning } from "./hooks";
import "./DeleteDocumentWarning.css";

type Props = {
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
};

export const DeleteDocumentWarning = ({ setShowDeleteWarning }: Props) => {
  const {
    currentFile,
    setCurrentFile,
    setMarkdown,
    setFileTitle,
    files,
    setFiles,
  } = useFile();
  const { handleDelete } = useDeleteDocumentWarning({
    setMarkdown,
    setFileTitle,
    setShowDeleteWarning,
    setCurrentFile,
    files,
    setFiles,
    currentFile,
  });
  return (
    <WarningMessage setShowWarning={setShowDeleteWarning}>
      <div className="delete-document-warning">
        <h4>Delete this document?</h4>
        <p>
          Are you sure you want to delete the `{currentFile?.title}` document
          and its contents? This action cannot be reversed.
        </p>
        <button className="reg-button" onClick={handleDelete}>
          Confirm & Delete
        </button>
      </div>
    </WarningMessage>
  );
};
