import React, { SetStateAction, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MarkdownFile } from "../../Sidebar/MyDocuments";

type Props = {
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  setCurrentFile: React.Dispatch<
    SetStateAction<{
      title: string;
      content: string;
      createdAt: string;
      id: string;
    }>
  >;
  currentFile: {
    title: string;
    content: string;
    createdAt: string;
    id: string;
  };
  files: { title: string; content: string; createdAt: string; id: string }[];
  setFiles: React.Dispatch<
    SetStateAction<
      { title: string; content: string; createdAt: string; id: string }[]
    >
  >;
};

const useNavbar = ({
  setShowDeleteWarning,
  setCurrentFile,
  currentFile,
  files,
  setFiles,
}: Props) => {
  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  const handleSave = (
    currentFile: Props["currentFile"],
    title: string,
    content: string
  ) => {
    let id = currentFile.id || uuidv4();
    const payload = {
      id: id,
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    let updatedFiles: MarkdownFile[];

    if (currentFile && currentFile.id !== "") {
      // Update existing file
      updatedFiles = files.map((file) =>
        file.id === currentFile.id ? payload : file
      );
    } else {
      // Add new file
      updatedFiles = [...files, payload];
    }

    setFiles(updatedFiles);
    setCurrentFile(payload);
    // Removed direct localStorage update
  };

  useEffect(() => {
    try {
      localStorage.setItem("markdown-files", JSON.stringify(files));
    } catch (error) {
      console.error("Error saving markdown files to localStorage:", error);
    }
  }, [files]);

  const handleDownload = () => {
    const blob = new Blob([currentFile?.content], {
      type: "text/markdown;charset=utf-8",
    });
    const fileName = `${currentFile?.title || "Untitled"}.md`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return { handleDelete, handleSave, handleDownload };
};

export default useNavbar;
