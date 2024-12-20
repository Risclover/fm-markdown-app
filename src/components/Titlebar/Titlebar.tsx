import React, { SetStateAction, useContext } from "react";
import { ThemeContext } from "../../context";
import { useTitlebar } from "./hooks";
import { Logos } from "../../assets";
import "./Titlebar.css";

type Props = {
  showPreview: boolean;
  setShowPreview: React.Dispatch<SetStateAction<boolean>>;
  title: string;
};

export const Titlebar = ({ showPreview, setShowPreview, title }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { handlePreviewClick } = useTitlebar({ showPreview, setShowPreview });

  return (
    <header className={`title-bar-container ${theme === "dark" ? "dark" : ""}`}>
      <div
        className={`${
          showPreview ? "title-bar-left" : "title-bar-left full-bar"
        }`}
      >
        <span className="small-heading">{title}</span>
      </div>
      <div
        className={`${
          !showPreview ? "title-bar-right" : "title-bar-right full-bar"
        }`}
      >
        {!showPreview && <span className="small-heading">Preview</span>}
        <button
          className={`show-preview ${theme}`}
          onClick={handlePreviewClick}
        >
          {!showPreview ? (
            <img
              className="show-preview-icon"
              src={Logos.IconShowPreview}
              alt="Show Preview"
            />
          ) : (
            <img
              className="hide-preview-icon"
              src={Logos.IconHidePreview}
              alt="Hide Preview"
            />
          )}
        </button>
      </div>
    </header>
  );
};
