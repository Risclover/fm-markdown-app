import React, { SetStateAction } from "react";

type Props = {
  setFileTitle: React.Dispatch<SetStateAction<string>>;
};

export const useFileTitle = ({ setFileTitle }: Props) => {
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileTitle(e.target.value);
  };

  return { updateTitle };
};
