import { useEffect, useState } from "react";
import data from "../../../data/data.json";

interface MarkdownFile {
  title: string;
  content: string;
  createdAt: string;
  id: string;
}

const useHomepage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [files, setFiles] = useState<MarkdownFile[]>(() => {
    const storedFiles = localStorage.getItem("markdown-files");
    if (storedFiles) {
      return JSON.parse(storedFiles);
    } else {
      // No files in localStorage, initialize with default file from data.json
      const defaultFile = data[0]; // Assuming data[0] is your default file
      const initialFiles = [defaultFile];
      localStorage.setItem("markdown-files", JSON.stringify(initialFiles));
      return initialFiles;
    }
  });
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(files[0]);
  const [markdown, setMarkdown] = useState<string>(() => {
    const storedFiles = localStorage.getItem("markdown-files");
    const parsedFiles: MarkdownFile[] = storedFiles
      ? JSON.parse(storedFiles)
      : [];
    return parsedFiles[0]?.content || "";
  });
  const [fileTitle, setFileTitle] = useState(files[0]?.title || "");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showIdenticalTitleWarning, setShowIdenticalTitleWarning] =
    useState(false);
  const [showChangesUnsavedWarning, setShowChangesUnsavedWarning] =
    useState(false);
  const [changesSaved, setChangesSaved] = useState(true);
  const [pendingFile, setPendingFile] = useState<MarkdownFile | null>(null);
  const [warningType, setWarningType] = useState("");

  useEffect(() => {
    setMarkdown(files[0]?.content);
  }, [files]);

  useEffect(() => {
    setFileTitle(currentFile?.title || "");
    setMarkdown(currentFile?.content || "");
  }, [currentFile]);

  useEffect(() => {
    console.log("changes saved?:", changesSaved);
  }, [changesSaved]);

  useEffect(() => {
    try {
      localStorage.setItem("markdown-files", JSON.stringify(files));
    } catch (error) {
      console.error("Error saving markdown files to localStorage:", error);
    }
  }, [files]);

  useEffect(() => {
    if (currentFile?.title !== fileTitle || currentFile?.content !== markdown) {
      setChangesSaved(false);
    }
  }, [markdown, fileTitle]);

  return {
    showSidebar,
    setShowSidebar,
    showPreview,
    setShowPreview,
    isDark,
    setIsDark,
    currentFile,
    setCurrentFile,
    markdown,
    setMarkdown,
    fileTitle,
    setFileTitle,
    showDeleteWarning,
    setShowDeleteWarning,
    showIdenticalTitleWarning,
    setShowIdenticalTitleWarning,
    showChangesUnsavedWarning,
    setShowChangesUnsavedWarning,
    files,
    setFiles,
    changesSaved,
    setChangesSaved,
    pendingFile,
    setPendingFile,
    warningType,
    setWarningType,
  };
};

export default useHomepage;
