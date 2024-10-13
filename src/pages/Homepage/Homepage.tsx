import React from "react";
import WarningMessage from "../../components/WarningMessage/WarningMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Titlebar from "../../components/Titlebar/Titlebar";
import MarkdownTextarea from "../../components/MarkdownTextarea/MarkdownTextarea";
import MarkdownPreview from "../../components/MarkdownPreview/MarkdownPreview";
import useHomepage from "./hooks/useHomepage";

type Props = {};

const Homepage = (props: Props) => {
  const {
    showSidebar,
    setShowSidebar,
    markdown,
    setMarkdown,
    fileTitle,
    setFileTitle,
  } = useHomepage();

  return (
    <div className="app-container">
      <WarningMessage />
      {showSidebar && <Sidebar />}
      <Navbar
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        fileTitle={fileTitle}
      />
      <Titlebar />
      <MarkdownTextarea />
      <MarkdownPreview />
    </div>
  );
};

export default Homepage;
