import { useContext } from "react";
import { ThemeContext } from "../../context";
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
import "./Homepage.css";

export const Homepage = () => {
  const { theme } = useContext(ThemeContext);

  const {
    showSidebar,
    setShowSidebar,
    showDeleteWarning,
    setShowDeleteWarning,
    showIdenticalTitleWarning,
    setShowIdenticalTitleWarning,
    showPreview,
    setShowPreview,
    changesSaved,
    setChangesSaved,
    showChangesUnsavedWarning,
    setShowChangesUnsavedWarning,
    pendingFile,
    setPendingFile,
    warningType,
    setWarningType,
  } = useHomepage();

  return (
    <div className="app-container">
      {showDeleteWarning && (
        <DeleteDocumentWarning setShowDeleteWarning={setShowDeleteWarning} />
      )}
      {showIdenticalTitleWarning && (
        <IdenticalTitleWarning
          setShowWarning={setShowIdenticalTitleWarning}
          warningType={warningType}
        />
      )}
      {showChangesUnsavedWarning && (
        <ChangesUnsavedWarning
          changesSaved={changesSaved}
          setChangesSaved={setChangesSaved}
          setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
          setPendingFile={setPendingFile}
          pendingFile={pendingFile}
        />
      )}
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        changesSaved={changesSaved}
        setShowChangesUnsavedWarning={setShowChangesUnsavedWarning}
        setPendingFile={setPendingFile}
      />
      <div className={`main-container ${showSidebar ? "shifted" : ""}`}>
        <Navbar
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          setShowDeleteWarning={setShowDeleteWarning}
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
          {!showPreview && <MarkdownTextarea showPreview={showPreview} />}
          <MarkdownPreview showPreview={showPreview} />
        </main>
      </div>
    </div>
  );
};
