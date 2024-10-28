import React, { SetStateAction } from "react";

interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

type Props = {
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setCurrentFile: React.Dispatch<React.SetStateAction<MarkdownFile>>;
  files: MarkdownFile[];
  setFiles: React.Dispatch<SetStateAction<MarkdownFile[]>>;
  currentFile: MarkdownFile;
};

const useDeleteDocumentWarning = ({
  setShowDeleteWarning,
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  files,
  setFiles,
  currentFile,
}: Props) => {
  const handleDelete = () => {
    if (!currentFile || !currentFile.id) {
      console.error("No file selected for deletion.");
      return;
    }

    // Remove the currentFile from the files array
    const updatedFiles = files.filter((file) => file.id !== currentFile.id);

    // Update the files in state
    setFiles(updatedFiles);

    // Update the current file and other state variables
    if (updatedFiles.length > 0) {
      // Set to the first file in the updated files array
      const newCurrentFile = updatedFiles[0];
      setCurrentFile(newCurrentFile);
      setMarkdown(newCurrentFile.content);
      setFileTitle(newCurrentFile.title);
    } else {
      // No files left, reset states
      setCurrentFile({ id: "", title: "", content: "", createdAt: "" });
      setMarkdown("");
      setFileTitle("");
    }

    setShowDeleteWarning(false);
  };

  return { handleDelete };
};

export default useDeleteDocumentWarning;
