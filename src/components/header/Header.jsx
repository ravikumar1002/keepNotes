import "./header.css"
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth-context";
import { useState, useEffect, useRef } from "react";
import { useUserData } from "../../context/user-data-context";
export const Header = () => {
    const location = useLocation()
    const { token, logout } = useAuth()
    const navigate = useNavigate()
    const { userDataState, userDataDispatch } = useUserData()
    const userIntialData = {
        allNotes: [],
        archiveNotes: [],
        trashNotes: [],
        filteredNotes: [],
    }
    return (
        <header className=" p-2 header-wrapper">
            <div >
                <h2>
                    <Link to="/" className=" text-decoration-none">
                        Keep Notes
                    </Link>
                </h2>
            </div>
            <div className="header-btn">
                <button className="btn btn-sm btn-danger border-squre" onClick={async () => {
                    await logout()
                    userDataDispatch({
                        type: "LOGOUT"
                    })
                    navigate("/signup")
                }}>Logout</button>
            </div>
        </header>
    )
}