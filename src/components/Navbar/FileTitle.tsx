import React, { SetStateAction } from "react";
import DocumentIcon from "../../assets/images/icon-document.svg";
import useFileTitle from "./hooks/useFileTitle";

type Props = {
  fileTitle: string;
  setFileTitle: React.Dispatch<SetStateAction<string>>;
};

const FileTitle = ({ fileTitle, setFileTitle }: Props) => {
  const { updateTitle } = useFileTitle({ setFileTitle });

  return (
    <div className="navbar-file-name">
      <img src={DocumentIcon} alt="Document" />
      <div className="navbar-file-name-right">
        <span className="document-name">Document Name</span>
        <div className="file-name">
          <input
            placeholder="welcome.md"
            className="medium-heading"
            onChange={updateTitle}
            value={fileTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default FileTitle;
