import React, { SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MarkdownFile } from "../../Sidebar/MyDocuments";

type Props = {
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  setCurrentFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  currentFile: MarkdownFile | null;
  files: MarkdownFile[];
  setFiles: React.Dispatch<SetStateAction<MarkdownFile[]>>;
  setShowIdenticalTitleWarning: React.Dispatch<SetStateAction<boolean>>;
  fileTitle: string;
  changesSaved: boolean;
  setChangesSaved: React.Dispatch<SetStateAction<boolean>>;
  setWarningType: React.Dispatch<SetStateAction<string>>;
};

const useNavbar = ({
  setShowDeleteWarning,
  setCurrentFile,
  currentFile,
  files,
  setFiles,
  setShowIdenticalTitleWarning,
  fileTitle,
  setChangesSaved,
  setWarningType,
}: Props) => {
  const [savedText, setSavedText] = useState("Save Changes");
  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  const handleSave = (
    currentFile: Props["currentFile"],
    title: string,
    content: string
  ) => {
    if (savedText === "Saved!") {
      return;
    }

    console.log(files.find((file) => file.title === fileTitle));

    if (
      files.find((file) => file.title === title && file.id !== currentFile?.id)
    ) {
      setShowIdenticalTitleWarning(true);
      setWarningType("duplicate");
      return;
    }

    if (title.length === 0) {
      setShowIdenticalTitleWarning(true);
      setWarningType("blank");
      return;
    }

    if (title.includes(".")) {
      setShowIdenticalTitleWarning(true);
      setWarningType("dot");
      return;
    }

    let id = currentFile?.id || uuidv4();
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
    setSavedText("Saved!");
    setTimeout(() => {
      setSavedText("Save Changes");
    }, 3000);
    setChangesSaved(true);
  };

  useEffect(() => {
    try {
      localStorage.setItem("markdown-files", JSON.stringify(files));
    } catch (error) {
      console.error("Error saving markdown files to localStorage:", error);
    }
  }, [files]);

  const handleDownload = () => {
    const blob = new Blob([currentFile?.content || ""], {
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

  return { handleDelete, handleSave, handleDownload, savedText };
};

export default useNavbar;
