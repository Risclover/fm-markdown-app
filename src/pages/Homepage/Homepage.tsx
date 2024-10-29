import { useContext, useEffect } from "react";
import {
  Sidebar,
  Navbar,
  Titlebar,
  MarkdownTextarea,
  MarkdownPreview,
  DeleteDocumentWarning,
  IdenticalTitleWarning,
  ChangesUnsavedWarning,
} from "../../components";
import { useHomepage } from "./hooks";
import { ThemeContext } from "../../context";
import "./Homepage.css";

export const Homepage = () => {
  const { theme } = useContext(ThemeContext);

  const {
    showSidebar,
    setShowSidebar,
    markdown,
    setMarkdown,
    fileTitle,
    setFileTitle,
    showDeleteWarning,
    setShowDeleteWarning,
    showIdenticalTitleWarning,
    setShowIdenticalTitleWarning,
    currentFile,
    setCurrentFile,
    showPreview,
    setShowPreview,
    files,
    setFiles,
    changesSaved,
    setChangesSaved,
    showChangesUnsavedWarning,
    setShowChangesUnsavedWarning,
    pendingFile,
    setPendingFile,
    warningType,
    setWarningType,
  } = useHomepage();

  useEffect(() => {
    console.log("current file:", currentFile);
  }, [currentFile]);

  return (
    <div className="app-container">
      {showDeleteWarning && (
        <DeleteDocumentWarning
          setMarkdown={setMarkdown}
          setFileTitle={setFileTitle}
          setShowDeleteWarning={setShowDeleteWarning}
          setCurrentFile={setCurrentFile}
          currentFile={currentFile}
          files={files}
          setFiles={setFiles}
        />
      )}
      {showIdenticalTitleWarning && (
        <IdenticalTitleWarning
          fileTitle={fileTitle}
          setShowWarning={setShowIdenticalTitleWarning}
          warningType={warningType}
        />
      )}
      {showChangesUnsavedWarning && (
        <ChangesUnsavedWarning
          changesSaved={changesSaved}
          setChangesSaved={setChangesSaved}
          setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
          setCurrentFile={setCurrentFile}
          setPendingFile={setPendingFile}
          pendingFile={pendingFile}
        />
      )}
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setMarkdown={setMarkdown}
        setFileTitle={setFileTitle}
        setCurrentFile={setCurrentFile}
        files={files}
        setFiles={setFiles}
        changesSaved={changesSaved}
        setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
        setPendingFile={setPendingFile}
        currentFile={currentFile}
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
          files={files}
          setFiles={setFiles}
          setShowIdenticalTitleWarning={setShowIdenticalTitleWarning}
          setChangesSaved={setChangesSaved}
          changesSaved={changesSaved}
          setWarningType={setWarningType}
        />
        <Titlebar
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          title={!showPreview ? "Markdown" : "Preview"}
        />
        <main className={theme}>
          {!showPreview && (
            <MarkdownTextarea
              showPreview={showPreview}
              markdown={markdown}
              setMarkdown={setMarkdown}
            />
          )}

          <MarkdownPreview
            markdown={markdown}
            currentFile={currentFile}
            showPreview={showPreview}
          />
        </main>
      </div>
    </div>
  );
};
