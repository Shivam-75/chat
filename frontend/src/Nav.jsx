import React from 'react'
import "./css/nav.css"
import {NavLink} from "react-router-dom"
const Nav = () => {
  return (
    <div className="nav">
      <NavLink className={"navlin"} to="/chat">
        chat
      </NavLink>
      <NavLink className={"navlin"} to="/">
        Home
      </NavLink>
      <NavLink className={"navlin"} to="/service">
        service
      </NavLink>
      <NavLink className={"navlin"} to="/about">
        about
      </NavLink>
    </div>
  );
}

export default Nav