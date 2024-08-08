import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as TbIcons from "react-icons/tb";

//Sidebar Daten für die Navigationsbar - path, Name und Icon werden festgelegt. Hier kann die Sidebar erweitert werden (einfach kopieren und neue hinzufügen)
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    iconFilled: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Filter",
    path: "/filter",
    icon: <TbIcons.TbFilterSearch />,
    iconFilled: <TbIcons.TbFilterFilled />,
    cName: "nav-text",
  },
  {
    title: "Favorites",
    path: "/favorites",
    icon: <FaIcons.FaRegHeart />,
    iconFilled: <FaIcons.FaHeart />,
    cName: "nav-text",
  },
];
