// hooks/useMyDocuments.ts
import React, { useState, useEffect, SetStateAction } from "react";

export interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface UseMyDocumentsProps {
  setCurrentFile: React.Dispatch<React.SetStateAction<MarkdownFile>>;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  setFileTitle: React.Dispatch<React.SetStateAction<string>>;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  files: { content: string; title: string; id: string; createdAt: string }[];
  setFiles: React.Dispatch<
    SetStateAction<
      { content: string; title: string; id: string; createdAt: string }[]
    >
  >;
}

interface UseMyDocumentsReturn {
  formatDate: (dateString: string) => string;
  handleNewDocument: () => void;
  files: MarkdownFile[];
  setFiles: React.Dispatch<React.SetStateAction<MarkdownFile[]>>;
}

const useMyDocuments = ({
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  setShowSidebar,
  files,
  setFiles,
}: UseMyDocumentsProps): UseMyDocumentsReturn => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNewDocument = () => {
    setCurrentFile({ title: "", id: "", content: "", createdAt: "" });
    setMarkdown("");
    setFileTitle("");
    setShowSidebar(false);
  };

  useEffect(() => {
    localStorage.setItem("markdown-files", JSON.stringify(files));
  }, [files]);

  return { formatDate, handleNewDocument, files, setFiles };
};

export default useMyDocuments;
