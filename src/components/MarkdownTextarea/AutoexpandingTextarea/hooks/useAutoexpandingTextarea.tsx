import React, { useEffect, useState } from "react";

type Props = {
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
};

const useAutoexpandingTextarea = ({ textareaRef }: Props) => {
  const [textareaValue, setTextareaValue] = useState("");

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [textareaValue]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  return { handleChange, textareaValue, setTextareaValue };
};

export default useAutoexpandingTextarea;
