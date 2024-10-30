import React, { SetStateAction } from "react";
import { useSidebarMenuBtn } from "./hooks";

type Props = {
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
};

export const SidebarMenuBtn = ({ setShowSidebar, showSidebar }: Props) => {
  const { handleSidebarToggle } = useSidebarMenuBtn({
    setShowSidebar,
    showSidebar,
  });
  return (
    <button
      className="sidebar-menu-btn"
      onClick={handleSidebarToggle}
      aria-label="Menu"
    >
      <span className={`menu-icon ${showSidebar ? "close" : ""}`}>
        <span className="lines"></span>
      </span>
    </button>
  );
};
