import React, { useContext, useState, useEffect, ReactNode } from "react";
import { Data } from "../data";
import type { MarkdownFile } from "../types";

interface FileContextType {
  files: MarkdownFile[];
  setFiles: React.Dispatch<React.SetStateAction<MarkdownFile[]>>;
  currentFile: MarkdownFile | null;
  setCurrentFile: React.Dispatch<React.SetStateAction<MarkdownFile | null>>;
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  fileTitle: string;
  setFileTitle: React.Dispatch<React.SetStateAction<string>>;
}

type FileProviderProps = {
  children: ReactNode;
};

export const FileContext = React.createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider = ({ children }: FileProviderProps) => {
  const [files, setFiles] = useState<MarkdownFile[]>(() => {
    try {
      const storedFiles = localStorage.getItem("markdown-files");
      if (storedFiles) {
        const parsedFiles = JSON.parse(storedFiles);
        if (Array.isArray(parsedFiles) && parsedFiles.length > 0) {
          return parsedFiles;
        }
      }
    } catch (error) {
      console.error("Error parsing stored files:", error);
    }

    const defaultFile = Data[0];
    const initialFiles = [defaultFile];
    localStorage.setItem("markdown-files", JSON.stringify(initialFiles));
    return initialFiles;
  });

  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(files[0]);
  const [markdown, setMarkdown] = useState<string>(() => {
    return files[0]?.content || "";
  });
  const [fileTitle, setFileTitle] = useState(files[0]?.title || "");

  useEffect(() => {
    setMarkdown(currentFile?.content || "");
    setFileTitle(currentFile?.title || "");
  }, [currentFile]);

  useEffect(() => {
    try {
      localStorage.setItem("markdown-files", JSON.stringify(files));
    } catch (error) {
      console.error("Error saving files to localStorage:", error);
    }
  }, [files]);

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

export const useFile = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};
