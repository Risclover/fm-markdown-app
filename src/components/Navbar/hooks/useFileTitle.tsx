import React, { SetStateAction } from "react";

type Props = {
  setFileTitle: React.Dispatch<SetStateAction<string>>;
};

const useFileTitle = ({ setFileTitle }: Props) => {
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\./g, "");
    setFileTitle(sanitizedValue);
  };

  return { updateTitle };
};

export default useFileTitle;
