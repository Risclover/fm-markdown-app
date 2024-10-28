import React, { SetStateAction } from "react";
import DocumentIcon from "../../assets/images/icon-document.svg";
import { formatDate } from "./utils/formatDate";

type Props = {
  date: string;
  name: string;
  file: { id: string; createdAt: string; title: string; content: string };
  setCurrentFile: React.Dispatch<
    SetStateAction<{
      id: string;
      createdAt: string;
      title: string;
      content: string;
    }>
  >;
};

const Document = ({ date, name, file, setCurrentFile }: Props) => {
  return (
    <div className="document-container" onClick={() => setCurrentFile(file)}>
      <span className="document-icon">
        <img src={DocumentIcon} alt="Document" />
      </span>
      <div className="document-info">
        <span className="document-info-date">{formatDate(date)}</span>
        <span className="document-info-name medium-heading">{file.title}</span>
      </div>
    </div>
  );
};

export default Document;
