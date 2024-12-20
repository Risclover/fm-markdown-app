import React, { SetStateAction } from "react";
import { useMyDocuments } from "./hooks";
import { Document } from "./Document";

export interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

type Props = {
  setCurrentFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  files: MarkdownFile[];
  setFiles: React.Dispatch<SetStateAction<MarkdownFile[]>>;
  changesSaved: boolean;
  setShowChangesUnsavedWarning: React.Dispatch<SetStateAction<boolean>>;
  setPendingFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  setShowPreview: React.Dispatch<SetStateAction<boolean>>;
};

export const MyDocuments: React.FC<Props> = ({
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  setShowSidebar,
  files,
  setFiles,
  changesSaved,
  setShowChangesUnsavedWarning,
  setPendingFile,
  setShowPreview,
}) => {
  const { formatDate, handleNewDocument } = useMyDocuments({
    setCurrentFile,
    setMarkdown,
    setFileTitle,
    setShowSidebar,
    files,
    setFiles,
    setShowChangesUnsavedWarning,
    setPendingFile,
    changesSaved,
    setShowPreview,
  });

  return (
    <div className="my-documents-container">
      <span className="my-documents-title small-heading">My Documents</span>
      <button
        className="reg-button new-document-btn"
        onClick={handleNewDocument}
      >
        + New Document
      </button>
      {files?.map((file) => (
        <Document
          key={file.id} // Ensure each child has a unique key
          date={formatDate(file.createdAt)}
          file={file}
          changesSaved={changesSaved}
          setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
          setPendingFile={setPendingFile}
        />
      ))}
    </div>
  );
};
