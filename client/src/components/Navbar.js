import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { UidContext } from './AppContext';
import Logout from './Log/Logout';



const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);


    return (
        <nav>
            <div className="nav-container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/yellowlogo.png" alt="" />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <div className="welcome d-flex align-items-center">
                        <NavLink exact to="/profil">
                            <h5>Bienvenue {userData.username}</h5>
                        </NavLink>
                        <Logout />
                    </div>
                ) : (
                    <div className="login">
                        <NavLink exact to="/profil">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-in-right icon-navbar" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;