import React from "react";
import {Navigate, Link, Route, Routes} from "react-router-dom";
//redux
import {useSelector} from "react-redux";
//Components
import {NotFound} from "../NotFoundScreen";
import {FileScreen} from "./FileScreen";
import {ShareScreen} from "./ShareScreen";

const routes = [
    {
        path: "/",
        exact: true,
        strict: true,
        main: () => <Navigate to="/fss/file"/>
    },
    {
        path: "/file",
        exact: true,
        strict: true,
        main: () => <FileScreen/>
    },
    {
        path: "/share",
        exact: true,
        strict: true,
        main: () => <ShareScreen/>
    },
    {
        path: "*",
        main: () => <NotFound/>
    }
];

export const MainScreen = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <div id="wrapper">
            <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                <div className="container-fluid d-flex flex-column p-0"><Link
                    className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                    to="/">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink"></i></div>
                    <div className="sidebar-brand-text mx-3"><span>FSS</span></div>
                </Link>
                    <hr className="sidebar-divider my-0"/>
                        <ul className="navbar-nav text-light" id="accordionSidebar">
                            <li className="nav-item"><Link className="nav-link" to="file"><i
                                className="far fa-file"></i><span>File</span></Link></li>
                            <li className="nav-item"><Link className="nav-link" to="share"><i
                                className="far fa-share-square"></i><span>Share</span></Link></li>
                        </ul>
                </div>
            </nav>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                        <div className="container-fluid">
                            <ul className="navbar-nav flex-nowrap ms-auto">
                                <li className="nav-item dropdown no-arrow">
                                    <div className="nav-item dropdown no-arrow"><Link className="dropdown-toggle nav-link"
                                                                                   aria-expanded="false"
                                                                                   data-bs-toggle="dropdown"
                                                                                   to="#"><span
                                        className="d-none d-lg-inline me-2 text-gray-600 small">{user.username}</span><img
                                        className="border rounded-circle img-profile"
                                        src={`${process.env.PUBLIC_URL}/img/avatars/avatar1.jpeg`}  alt="user icon"/></Link>
                                        <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in"><Link
                                            className="dropdown-item" to="#"><i
                                            className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</Link><Link
                                            className="dropdown-item" to="#"><i
                                            className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</Link><Link
                                            className="dropdown-item" to="#"><i
                                            className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity
                                            log</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="#"><i
                                                className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <Routes>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    strict={route.strict}
                                    element={<route.main/>}
                                />
                            ))}
                        </Routes>
                    </div>
                </div>
                <footer className="bg-white sticky-footer">
                    <div className="container my-auto">
                        <div className="text-center my-auto copyright"><span>Copyright © FSS 2022</span></div>
                    </div>
                </footer>
            </div>
            <Link className="border rounded d-inline scroll-to-top" to="#page-top"><i
                className="fas fa-angle-up"></i></Link>
        </div>
    );
};
