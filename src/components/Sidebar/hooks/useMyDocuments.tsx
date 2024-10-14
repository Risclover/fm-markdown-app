import React, { SetStateAction, useEffect, useState } from "react";

type Props = {
  setCurrentFile: React.Dispatch<
    SetStateAction<{
      id: string;
      title: string;
      content: string;
      createdAt: string;
    }>
  >;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
};

const useMyDocuments = ({
  setCurrentFile,
  setMarkdown,
  setFileTitle,
  setShowSidebar,
}: Props) => {
  const [files, setFiles] = useState<
    { title: string; content: string; createdAt: string; id: string }[]
  >([]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A"; // Handle null or undefined dates
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates

    // Define options for toLocaleDateString
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    // Use 'en-GB' locale for "07 October 2024" format
    return date.toLocaleDateString("en-GB", options); // "07 October 2024"
  };

  const handleNewDocument = () => {
    setCurrentFile({ id: "", title: "", createdAt: "", content: "" });
    setMarkdown("");
    setFileTitle("");
    setShowSidebar(false);
  };

  return { files, setFiles, handleNewDocument, formatDate };
};

export default useMyDocuments;
