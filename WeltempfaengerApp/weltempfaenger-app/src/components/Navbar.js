import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //Zum Ein- und Ausklappen der Sidebar mit Konditionaloperator
  const [isPageSelected, setIsPageSelected] = useState(false);

  const showSidebar = () => setIsSidebarOpen(!isSidebarOpen); //Je nachdem, ob die Sidebar ausgeklappt ist oder nicht, wird der boolean Wert zum Gegenteil geändert
  const showPage = () => setIsPageSelected(!isPageSelected);

  return (
    <>
      <IconContext.Provider value={{ color: "#ec6525" }}>
        <div className={!isPageSelected ? "navbar" : "navbar-home"}>
          {!isSidebarOpen && (
            <div className="bars-container">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
              <Link to="/" className="menu-closer">
                <AiIcons.AiOutlineClose />
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
              return (
                <li key={index} className={item.cName} onClick={showPage}>
                  <Link to={item.path}>
                    {item.icon}
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
