import React, { useState } from "react";
import data from "../../../data/data.json";

const useHomepage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentFile, setCurrentFile] = useState(data[1]);
  const [markdown, setMarkdown] = useState(data[1]?.content || "");
  const [fileTitle, setFileTitle] = useState(data[1]?.title || "");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

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
  };
};

export default useHomepage;
