import React, { SetStateAction, useEffect, useState } from "react";
import useMyDocuments from "./hooks/useMyDocuments";
import Document from "./Document";

type Props = {
  setCurrentFile: React.Dispatch<
    SetStateAction<{ title: string; content: string; createdAt: string }>
  >;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
};

const MyDocuments = ({
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  setShowSidebar,
}: Props) => {
  const { formatDate, handleNewDocument, files, setFiles } = useMyDocuments({
    setCurrentFile,
    setMarkdown,
    setFileTitle,
    setShowSidebar,
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
          name={file.title}
          date={formatDate(file.createdAt)}
          file={file}
        />
      ))}
    </div>
  );
};

export default MyDocuments;
