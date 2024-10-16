import React, { SetStateAction } from "react";

type Props = {
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setCurrentFile: React.Dispatch<
    SetStateAction<{
      id: string;
      title: string;
      content: string;
      createdAt: string;
    }>
  >;
};

const useDeleteDocumentWarning = ({
  setShowDeleteWarning,
  setCurrentFile,
  setMarkdown,
  setFileTitle,
}: Props) => {
  const handleDelete = () => {
    setShowDeleteWarning(false);
    setCurrentFile({ id: "", title: "", content: "", createdAt: "" });
    setMarkdown("");
    setFileTitle("");
  };
  return { handleDelete };
};

export default useDeleteDocumentWarning;
