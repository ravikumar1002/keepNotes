import "./sidebar.css"
import { Link, NavLink } from "react-router-dom";

export const Sidebar = () => {
    const activeStyle = {
        color: "#1C1C1E",
        fontWeight: "700",
        textDecoration: "none",
    }

    const deactiveStyle = {
        color: "#1C1C1E",
        fontWeight: "600",
        textDecoration: "none",
    }
    const getActiveStyle = ({ isActive }) => isActive ? activeStyle : deactiveStyle


    return (
        <div className="side-bar-wrapper">
            <NavLink style={getActiveStyle} to="/">
                <span>
                    <i className="fa-solid fa-house"></i>
                </span>
                <span> Home </span>
            </NavLink>
            <NavLink style={getActiveStyle} to="/">
                <span>
                    <i className="fa-solid fa-tag"></i>
                </span>
                <span> Labels </span>
            </NavLink>
            <NavLink style={getActiveStyle} to="/">
                <span>
                    <i className="fa-solid fa-box-archive"></i>
                </span>
                <span> Archive </span>
            </NavLink>
            <NavLink style={getActiveStyle} to="/trash">
                <span>
                    <i className="fa-solid fa-trash"></i>
                </span>
                <span> Trash </span>
            </NavLink>
            <NavLink style={getActiveStyle} to="/">
                <span>
                    <i className="fa-solid fa-user"></i>
                </span>
                <span> Profile </span>
            </NavLink>
        </div>
    )
}