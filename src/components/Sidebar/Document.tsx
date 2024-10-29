import React, { SetStateAction } from "react";
import { useFile } from "../../context";
import { MarkdownFile } from "./MyDocuments";
import { formatDate } from "./utils";
import { Logos } from "../../assets";

type Props = {
  date: string;
  file: MarkdownFile;
  changesSaved: boolean;
  setShowChangesUnsavedWarning: React.Dispatch<SetStateAction<boolean>>;
  setPendingFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
};

export const Document = ({
  date,
  file,
  changesSaved,
  setShowChangesUnsavedWarning,
  setPendingFile,
}: Props) => {
  const { currentFile, setCurrentFile } = useFile();

  const handleClick = () => {
    if (currentFile === file) {
      return;
    }
    if (!changesSaved) {
      setPendingFile(file);
      setShowChangesUnsavedWarning(true);
      return;
    } else {
      setCurrentFile(file);
    }
  };
  return (
    <div className={`document-container`} onClick={handleClick}>
      <span className="document-icon">
        <img src={Logos.IconDocument} alt="Document" />
      </span>
      <div
        className={`document-info ${currentFile === file ? "current-doc" : ""}`}
      >
        <span className="document-info-date">{formatDate(date)}</span>
        <span
          className={`${
            currentFile === file ? "current-file" : ""
          } document-info-name medium-heading`}
        >
          {file.title}
        </span>
      </div>
    </div>
  );
};
