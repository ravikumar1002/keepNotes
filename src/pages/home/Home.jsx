import "./home.css"
import { useAuth } from "../../context/auth-context"
import { SaveNotes, NoteCard } from "../../components"
import { createNewNotesInDB } from "../../services"
import { useEffect, useState } from "react"
import { useUserData } from "../../context/user-data-context"

export const Home = () => {
    const { token } = useAuth()
    const [createNotes, setCreateNotes] = useState(false)
    const { userDataState, userDataDispatch } = useUserData()
    const createNewNotes = (note) => {
        createNewNotesInDB(note, token, userDataDispatch)
    }


    return (
        <div>
            <div>
                <p> create new notes </p>
                {!createNotes && <button onClick={() => setCreateNotes(!createNotes)}>CreateNotes</button>}
                {createNotes && <NoteCard createNotes={createNotes} setCreateNotes={setCreateNotes} token={token} createNewNotes={createNewNotes} />}
            </div>
            <div>
                pin notes
            </div>
            <div className="d-flex gap-2 flex-wrap">
                {userDataState.allNotes.length > 0 && userDataState.allNotes.map((note) => {
                    return (
                            <SaveNotes userCreatedNotes={note} key= {note._id}/>
                    )
                })
                }
            </div>
        </div>
    )
}