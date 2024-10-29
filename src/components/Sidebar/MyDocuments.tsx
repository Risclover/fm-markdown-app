// MyDocuments.tsx
import React, { SetStateAction } from "react";
import useMyDocuments from "./hooks/useMyDocuments";
import Document from "./Document";

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
  currentFile: MarkdownFile | null;
};

const MyDocuments: React.FC<Props> = ({
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  setShowSidebar,
  files,
  setFiles,
  changesSaved,
  setShowChangesUnsavedWarning,
  setPendingFile,
  currentFile,
}) => {
  const { formatDate, handleNewDocument } = useMyDocuments({
    setCurrentFile,
    setMarkdown,
    setFileTitle,
    setShowSidebar,
    files,
    setFiles,
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
          setCurrentFile={setCurrentFile}
          key={file.id} // Ensure each child has a unique key
          date={formatDate(file.createdAt)}
          file={file}
          changesSaved={changesSaved}
          setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
          setPendingFile={setPendingFile}
          currentFile={currentFile}
        />
      ))}
    </div>
  );
};

export default MyDocuments;
