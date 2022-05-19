
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

    console.log(userDataState)

    return (
        <div>
            Archives
            <div>
                {userDataState.archiveNotes.length> 0 && userDataState.archiveNotes.map((archives) => {
                       return (
                        <SaveNotes userCreatedNotes={archives} key= {archives._id}/>
                       )
                })}
            </div>
        </div>
    )
}