import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import { SidebarData } from './SidebarData'



const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);


    return (
        <>
            <div className="navbar">
                {/* ----menu sidebar---- */}
                <Link to="#" className="menu-bars">
                    <i className="bi bi-list icon-navbar" onClick={showSidebar} />
                </Link>

                {/* ----Logo mysoccer---- */}
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/yellowlogo.png" alt="" />
                        </div>
                    </NavLink>
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <i className="bi bi-x"></i>
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li keys={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span><i className={item.icon} /> {item.title}</span>
                                </Link>
                            </li>

                        );
                    })}

                    {/* ----if user is connected---- */}
                    {uid ? (
                        <Logout />
                    ) : (
                        <NavLink exact to="/profil">
                            <button type="button" className="btn btn-outline-warning logout"><i className="bi bi-box-arrow-in-right" /> Connexion </button>
                        </NavLink>
                    )}
                </ul>
            </nav>

        </>
    );
};

export default Navbar;