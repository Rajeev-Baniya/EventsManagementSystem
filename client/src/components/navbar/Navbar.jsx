import React, { useEffect, useState, useContext } from "react";

import { NavLink, Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logos.png";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const exposeSidebar = () => {
    // console.log("hello");
    setOpenSidebar(!openSidebar);
  };
  useEffect(() => {
    setOpenSidebar(false);
  }, [location]);

  const { user, dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("User logged out successfully");
  };
  return (
    <>
      <nav className="nav">
        <ul className="left-items">
          <li>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </li>
        </ul>
        <ul className="right-items">
          {user ? (
            <ul className="right-items right-items1">
              <li>
                <NavLink activeClassName="active" to="/bookings">
                  My Bookings
                </NavLink>
              </li>

              <li className="user">
                <p className="userdetail">
                  <i class="fa-solid fa-user"></i>{" "}
                  <span className="username">{user.name}</span>
                  <i class="fa-solid fa-caret-down"></i>
                </p>
                <p className="showme" onClick={logout}>
                  Logout
                </p>
              </li>
            </ul>
          ) : (
            <ul className="right-items right-items1">
              <li>
                <NavLink activeClassName="active" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          )}

          <ul className="right-items2">
            <li onClick={() => exposeSidebar()}>
              {openSidebar ? (
                <>
                  <i className="fa-solid fa-xmark"></i>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bars"></i>
                </>
              )}
            </li>
          </ul>
        </ul>
      </nav>
      <div className="side-bar">
        <ul
          className={`sidebar-items ${openSidebar ? "in" : ""}`}
          id="sidebar-items"
        >
          {user ? (
            <>
              <li onClick={logout}>
                <Link>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink activeClassName="active" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
