import React, { SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  setShowDeleteWarning: React.Dispatch<SetStateAction<boolean>>;
  setCurrentFile: React.Dispatch<
    SetStateAction<{
      title: string;
      content: string;
      creatdAt: string;
      id: string;
    }>
  >;
  currentFile: {
    title: string;
    content: string;
    createdAt: string;
    id: string;
  };
};

const useNavbar = ({ setShowDeleteWarning }: Props) => {
  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  const handleSave = (title: string, content: string) => {
    const payload = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("markdown-file", JSON.stringify(payload));
  };

  return { handleDelete, handleSave };
};

export default useNavbar;
