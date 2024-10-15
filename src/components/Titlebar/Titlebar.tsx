import React, { SetStateAction, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import useTitlebar from "./hooks/useTitlebar";
import ShowPreviewIcon from "../../assets/images/icon-show-preview.svg";
import HidePreviewIcon from "../../assets/images/icon-hide-preview.svg";
import "./Titlebar.css";

type Props = {
  showPreview: boolean;
  setShowPreview: React.Dispatch<SetStateAction<boolean>>;
  title: string;
};

const Titlebar = ({ showPreview, setShowPreview, title }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { handlePreviewClick } = useTitlebar({ showPreview, setShowPreview });

  return (
    <div className={`title-bar-container ${theme === "dark" ? "dark" : ""}`}>
      <span className="small-heading">{title}</span>
      <button className={`show-preview ${theme}`} onClick={handlePreviewClick}>
        {!showPreview ? (
          <img
            className="show-preview-icon"
            src={ShowPreviewIcon}
            alt="Show Preview"
          />
        ) : (
          <img
            className="hide-preview-icon"
            src={HidePreviewIcon}
            alt="Hide Preview"
          />
        )}
      </button>
    </div>
  );
};

export default Titlebar;
