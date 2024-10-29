import React, { SetStateAction } from "react";
import WarningMessage from "../WarningMessage";
import useDeleteDocumentWarning from "./hooks/useDeleteDocumentWarning";
import "./DeleteDocumentWarning.css";
import { MarkdownFile } from "../../Sidebar/MyDocuments";

type Props = {
  setCurrentFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  currentFile: MarkdownFile | null;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  files: MarkdownFile[];
  setFiles: React.Dispatch<SetStateAction<MarkdownFile[]>>;
};

const DeleteDocumentWarning = ({
  currentFile,
  setMarkdown,
  setFileTitle,
  setShowDeleteWarning,
  setCurrentFile,
  files,
  setFiles,
}: Props) => {
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

export default DeleteDocumentWarning;
