import React from "react";
import WarningMessage from "../../components/WarningMessage/WarningMessage";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Titlebar from "../../components/Titlebar/Titlebar";
import MarkdownTextarea from "../../components/MarkdownTextarea/MarkdownTextarea";
import MarkdownPreview from "../../components/MarkdownPreview/MarkdownPreview";

type Props = {};

const Homepage = (props: Props) => {
  return (
    <div className="app-container">
      <WarningMessage />
      <Sidebar />
      <Navbar />
      <Titlebar />
      <MarkdownTextarea />
      <MarkdownPreview />
    </div>
  );
};

export default Homepage;
