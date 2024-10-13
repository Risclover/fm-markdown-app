import React, { SetStateAction } from "react";
import SidebarMenuBtn from "../Sidebar/SidebarMenuBtn";

type Props = {
  fileTitle: string;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
};

const Navbar = ({ fileTitle, setShowSidebar, showSidebar }: Props) => {
  return (
    <div className="navbar-container">
      <div className="navbar-container-left">
        <SidebarMenuBtn
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
      </div>
    </div>
  );
};

export default Navbar;
