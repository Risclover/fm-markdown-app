import React, { useEffect, SetStateAction } from "react";

export interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface UseMyDocumentsProps {
  setCurrentFile: React.Dispatch<React.SetStateAction<MarkdownFile | null>>;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  setFileTitle: React.Dispatch<React.SetStateAction<string>>;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  files: MarkdownFile[];
  setFiles: React.Dispatch<SetStateAction<MarkdownFile[]>>;
  setShowChangesUnsavedWarning: React.Dispatch<SetStateAction<boolean>>;
  setPendingFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  changesSaved: boolean;
}

interface UseMyDocumentsReturn {
  formatDate: (dateString: string) => string;
  handleNewDocument: () => void;
  files: MarkdownFile[];
  setFiles: React.Dispatch<React.SetStateAction<MarkdownFile[]>>;
}

export const useMyDocuments = ({
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  setShowSidebar,
  files,
  setFiles,
  setShowChangesUnsavedWarning,
  setPendingFile,
  changesSaved,
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
    if (!changesSaved) {
      setShowChangesUnsavedWarning(true);
      setPendingFile({ title: "", id: "", content: "", createdAt: "" });
      return;
    }
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
