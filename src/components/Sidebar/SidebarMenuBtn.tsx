import React, { SetStateAction } from "react";
import useSidebarMenuBtn from "./hooks/useSidebarMenuBtn";

type Props = {
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
};

const SidebarMenuBtn = ({ setShowSidebar, showSidebar }: Props) => {
  const { handleSidebarToggle } = useSidebarMenuBtn({
    setShowSidebar,
    showSidebar,
  });
  return (
    <button className="sidebar-menu-btn" onClick={handleSidebarToggle}>
      <div className={`menu-icon ${showSidebar ? "close" : ""}`}>
        <span className="lines"></span>
      </div>
    </button>
  );
};

export default SidebarMenuBtn;
