import React, { SetStateAction } from "react";

type Props = {
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
};

export const useSidebarMenuBtn = ({ setShowSidebar, showSidebar }: Props) => {
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return { showSidebar, setShowSidebar, handleSidebarToggle };
};
