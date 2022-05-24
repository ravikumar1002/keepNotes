import { getAllTrashItem } from "../../services"
import { useUserData } from "../../context/user-data-context"
import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import TrashCard from "./components/TrashCard"

export const Trash = () => {
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()

    useEffect(() => {
        getAllTrashItem(token, userDataDispatch)
    },[])

    return (
        <div>
            <div>
                <p className="fs-lg fw-700 text-center">Trash</p>
            </div>
            <div className="grid-layout">
                {userDataState?.trashNotes.length > 0 &&
                    userDataState?.trashNotes.map((trashNote) => {
                        return (
                            <TrashCard trashNote = {trashNote} key = {trashNote._id}/>
                        )
                    })
                }
            </div>
            {userDataState?.trashNotes.length === 0 && <div className="flex-center fs-md" style={{height: "10rem"}}> <p> Trash Is Empty</p></div>} 
        </div>
    )
}