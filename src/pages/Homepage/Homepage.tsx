import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Titlebar from "../../components/Titlebar/Titlebar";
import MarkdownTextarea from "../../components/MarkdownTextarea/MarkdownTextarea";
import MarkdownPreview from "../../components/MarkdownPreview/MarkdownPreview";
import useHomepage from "./hooks/useHomepage";
import "./Homepage.css";
import DeleteDocumentWarning from "../../components/WarningMessage/DeleteDocumentWarning/DeleteDocumentWarning";

type Props = {};

const Homepage = (props: Props) => {
  const {
    showSidebar,
    setShowSidebar,
    markdown,
    setMarkdown,
    fileTitle,
    setFileTitle,
    showDeleteWarning,
    setShowDeleteWarning,
    currentFile,
    setCurrentFile,
  } = useHomepage();

  return (
    <div className="app-container">
      {showDeleteWarning && (
        <DeleteDocumentWarning
          setMarkdown={setMarkdown}
          setFileTitle={setFileTitle}
          setShowDeleteWarning={setShowDeleteWarning}
          setCurrentFile={setCurrentFile}
          currentFile={currentFile}
        />
      )}
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setMarkdown={setMarkdown}
        setFileTitle={setFileTitle}
        setCurrentFile={setCurrentFile}
      />
      <div className={`main-container ${showSidebar ? "shifted" : ""}`}>
        <Navbar
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          fileTitle={fileTitle}
          setFileTitle={setFileTitle}
          setShowDeleteWarning={setShowDeleteWarning}
          markdown={markdown}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
        />
        <Titlebar />
        <MarkdownTextarea />
        <MarkdownPreview markdown={markdown} />
      </div>
    </div>
  );
};

export default Homepage;
