import React, { SetStateAction, useState } from "react";

type Props = {
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
};

const useSidebarMenuBtn = ({ setShowSidebar, showSidebar }: Props) => {
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return { showSidebar, setShowSidebar, handleSidebarToggle };
};

export default useSidebarMenuBtn;
