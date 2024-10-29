import React, { useContext, useState, useEffect } from "react";
import { Data } from "../data";
import type { MarkdownFile } from "../types";

export const FileContext = React.createContext();

export const FileProvider = ({ children }: any) => {
  const [files, setFiles] = useState<MarkdownFile[]>(() => {
    const storedFiles = localStorage.getItem("markdown-files");
    if (storedFiles) {
      return JSON.parse(storedFiles);
    } else {
      // No files in localStorage, initialize with default file from data.json
      const defaultFile = Data[0]; // Assuming data[0] is your default file
      const initialFiles = [defaultFile];
      localStorage.setItem("markdown-files", JSON.stringify(initialFiles));
      return initialFiles;
    }
  });

  useEffect(() => {
    console.log("data:", Data[0]);
  }, []);
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(files[0]);
  const [markdown, setMarkdown] = useState<string>(() => {
    const storedFiles = localStorage.getItem("markdown-files");
    const parsedFiles: MarkdownFile[] = storedFiles
      ? JSON.parse(storedFiles)
      : [];
    return parsedFiles[0]?.content || "";
  });
  const [fileTitle, setFileTitle] = useState(files[0]?.title || "");

  return (
    <FileContext.Provider
      value={{
        files,
        setFiles,
        currentFile,
        setCurrentFile,
        markdown,
        setMarkdown,
        fileTitle,
        setFileTitle,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => useContext(FileContext);
