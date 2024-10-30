import React, { SetStateAction } from "react";
import { DarkLightToggle, MyDocuments } from "../../components";
import type { MarkdownFile } from "../../types";
import { Logos } from "../../assets";
import "./Sidebar.css";
import { useFile } from "../../context";

type Props = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  changesSaved: boolean;
  setShowChangesUnsavedWarning: React.Dispatch<SetStateAction<boolean>>;
  setPendingFile: React.Dispatch<SetStateAction<MarkdownFile | null>>;
  setShowPreview: React.Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({
  showSidebar,
  setShowSidebar,
  changesSaved,
  setShowChangesUnsavedWarning,
  setPendingFile,
  setShowPreview,
}: Props) => {
  const { setFileTitle, setMarkdown, setCurrentFile, files, setFiles } =
    useFile();

  return (
    <div
      className={`sidebar${showSidebar ? " open" : ""}`}
      role="complementary"
    >
      <div className="sidebar-top">
        <img className="logo-show" src={Logos.Logo} alt="Markdown" />
        <MyDocuments
          setCurrentFile={setCurrentFile}
          setMarkdown={setMarkdown}
          setFileTitle={setFileTitle}
          setShowSidebar={setShowSidebar}
          files={files}
          setFiles={setFiles}
          changesSaved={changesSaved}
          setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
          setPendingFile={setPendingFile}
          setShowPreview={setShowPreview}
        />
      </div>
      <DarkLightToggle />
    </div>
  );
};
