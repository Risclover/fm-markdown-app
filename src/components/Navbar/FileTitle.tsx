import { useFile } from "../../context";
import { useFileTitle } from "./hooks";
import { Logos } from "../../assets";

export const FileTitle = () => {
  const { fileTitle, setFileTitle } = useFile();
  const { updateTitle } = useFileTitle({ setFileTitle });

  return (
    <div className="navbar-file-name">
      <img src={Logos.IconDocument} alt="Document" />
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
