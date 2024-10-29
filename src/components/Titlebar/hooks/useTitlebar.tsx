import React, { SetStateAction } from "react";

type Props = {
  showPreview: boolean;
  setShowPreview: React.Dispatch<SetStateAction<boolean>>;
};

export const useTitlebar = ({ showPreview, setShowPreview }: Props) => {
  const handlePreviewClick = () => {
    setShowPreview(!showPreview);
  };

  return { handlePreviewClick };
};
