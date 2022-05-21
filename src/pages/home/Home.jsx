import "./home.css"
import { useAuth } from "../../context/auth-context"
import { SaveNotes, NoteCard, Filter } from "../../components"
import { createNewNotesInDB } from "../../services"
import { useEffect, useState } from "react"
import { useUserData } from "../../context/user-data-context"
import { pinFn } from "../../utility"

export const Home = () => {
    const { token } = useAuth()
    const [createNotes, setCreateNotes] = useState(false)
    const { userDataState, userDataDispatch } = useUserData()
    const [notes, setNotes] = useState({
        allNotes: [],
        pinNotes: [],
    })
    const createNewNotes = (note) => {
        createNewNotesInDB(note, token, userDataDispatch)
    }
    const intialValue = {
        allNotes: [],
        pinNotes: [],
    };

    useEffect(() => {
        const notesData = pinFn(userDataState.filteredNotes, intialValue)
        setNotes({ ...notesData })
        console.log(userDataState.filteredNotes, "filteredNotes")
    }, [userDataState])

    return (
        <div>
            <div>
                {!createNotes && <div>
                    <button onClick={() => setCreateNotes(!createNotes)} className="btn-sm btn-primary border-squre m-2"> + CreateNotes</button>
                </div>
                }
                {createNotes && <NoteCard createNotes={createNotes} setCreateNotes={setCreateNotes} token={token} createNewNotes={createNewNotes} />}
            </div>
            <p>Pin notes</p>
            <div className="d-flex gap-2 flex-wrap">
                {notes?.pinNotes.length > 0 && notes?.pinNotes.map((note) => {
                    return (
                        <SaveNotes userCreatedNotes={note} key={note._id} />
                    )
                })
                }
            </div>
            <p>All notes</p>
            <div className="d-flex gap-2 flex-wrap">
                {notes?.allNotes.length > 0 && notes?.allNotes.map((note) => {
                    return (
                        <SaveNotes userCreatedNotes={note} key={note._id} />
                    )
                })
                }
            </div>
        </div>
    )
}

