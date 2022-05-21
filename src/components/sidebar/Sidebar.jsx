import "./sidebar.css"
import { Link, NavLink } from "react-router-dom";
import { findAllLabel } from "../../utility"
import { useEffect, useState } from "react";
import { useUserData } from "../../context/user-data-context";

export const Sidebar = () => {
    const { userDataState, userDataDispatch } = useUserData();
    const [userSaveLabel, setUserSaveLabel] = useState([])

    const activeStyle = {
        color: "rgb(13 13 206)",
        fontWeight: "700",
        textDecoration: "none",
        backgroundColor: "aliceblue",
    }

    const deactiveStyle = {
        color: "#1C1C1E",
        fontWeight: "600",
        textDecoration: "none",
    }
    const getActiveStyle = ({ isActive }) => isActive ? activeStyle : deactiveStyle ;

    useEffect(() => {
        const getLabel = findAllLabel(userDataState.allNotes);
        setUserSaveLabel(getLabel);
    }, [userDataState]);



    return (
        <div className="side-bar-wrapper">
            <NavLink style={getActiveStyle} to="/">
                <span>
                    <i className="fa-solid fa-house"></i>
                </span>
                <span> Home </span>
            </NavLink>
            {
                userSaveLabel.length > 0 && userSaveLabel.map((label) => {

                    return (
                        <NavLink style={getActiveStyle} to={`/label/${label.label}`} key={label._id}>
                            <span>{label.label}</span>
                        </NavLink>
                    )
                })
            }
            <NavLink style={getActiveStyle} to="/archives">
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
            
        </div>
    )
}