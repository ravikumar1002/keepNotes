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
                <p>Trash</p>
            </div>
            <div>
                {userDataState?.trashNotes.length > 0 &&
                    userDataState?.trashNotes.map((trashNote) => {
                        return (
                            <TrashCard trashNote = {trashNote}/>
                        )
                    })
                }
            </div>
        </div>
    )
}