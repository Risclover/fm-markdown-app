import { useEffect, useState } from "react";
import { useFile } from "../../../context";
import type { MarkdownFile } from "../../../types";

export const useHomepage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showIdenticalTitleWarning, setShowIdenticalTitleWarning] =
    useState(false);
  const [showChangesUnsavedWarning, setShowChangesUnsavedWarning] =
    useState(false);
  const [changesSaved, setChangesSaved] = useState(true);
  const [pendingFile, setPendingFile] = useState<MarkdownFile | null>(null);
  const [warningType, setWarningType] = useState("");
  const { files, currentFile, fileTitle, markdown } = useFile();

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
    markdown,
    fileTitle,
    showDeleteWarning,
    setShowDeleteWarning,
    showIdenticalTitleWarning,
    setShowIdenticalTitleWarning,
    showChangesUnsavedWarning,
    setShowChangesUnsavedWarning,
    files,
    changesSaved,
    setChangesSaved,
    pendingFile,
    setPendingFile,
    warningType,
    setWarningType,
  };
};
