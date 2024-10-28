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
  setCurrentFile: React.Dispatch<SetStateAction<MarkdownFile>>;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  files: { content: string; title: string; id: string; createdAt: string }[];
  setFiles: React.Dispatch<
    SetStateAction<
      { content: string; title: string; id: string; createdAt: string }[]
    >
  >;
};

const MyDocuments: React.FC<Props> = ({
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  setShowSidebar,
  files,
  setFiles,
}) => {
  const { formatDate, handleNewDocument } = useMyDocuments({
    setCurrentFile,
    setMarkdown,
    setFileTitle,
    setShowSidebar,
    files,
    setFiles,
  });

  // Optional: Log the type and content of files for debugging
  console.log(
    "Files:",
    files,
    "Type of files:",
    typeof files,
    "Is Array:",
    Array.isArray(files)
  );

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
          name={file.title}
          date={formatDate(file.createdAt)}
          file={file}
        />
      ))}
    </div>
  );
};

export default MyDocuments;
