
import {getAllArchivesItem} from "../../services"
import { useUserData } from "../../context/user-data-context"
import { useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { SaveNotes } from "../../components/save-notes-card/SaveNotes"
export const Archives = () => {
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()
    useEffect(() => {
        getAllArchivesItem(token, userDataDispatch)
    },[])

    return (
        <div>
            <p className="fs-lg fw-700 text-center">Archives</p>
            <div className="grid-layout">
                {userDataState.archiveNotes.length> 0 && userDataState.archiveNotes.map((archives) => {
                       return (
                        <SaveNotes userCreatedNotes={archives} key= {archives._id}/>
                       )
                })}
            </div>
            {userDataState?.archiveNotes.length === 0 && <div className="flex-center fs-md" style={{height: "10rem"}}> <p> Archives Is Empty</p></div>} 

        </div>
    )
}