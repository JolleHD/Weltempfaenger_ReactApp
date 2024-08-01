import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //Zum Ein- und Ausklappen der Sidebar mit Konditionaloperator
  const [isFilterListOpen, setIsFilterListOpen] = useState(false);

  const location = useLocation(); //Man bekommt die aktuelle URL -> zum Überprüfen welcher Reiter gerade ausgewählt ist (Icon filled und unfilled)

  //const showSidebar = () => setIsSidebarOpen(!isSidebarOpen); //Je nachdem, ob die Sidebar ausgeklappt ist oder nicht, wird der boolean Wert zum Gegenteil geändert
  const showSidebar = () => {
    if (isFilterListOpen) {
      setIsFilterListOpen(false); // Schließt die Filterliste, wenn die Sidebar geöffnet wird
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#ec6525" }}>
        <div className={!isSidebarOpen ? "navbar" : "navbar-closed"}>
          {!isSidebarOpen && (
            <div className="bars-container">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars className="icon-border" onClick={showSidebar} />
              </Link>
            </div>
          )}
        </div>
        <nav className={isSidebarOpen ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {isActive ? item.iconFilled : item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
