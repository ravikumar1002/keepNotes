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
    }

    const reducerFn = (acc, curr) => {

        if (curr?.pin === true) {
            return acc = {
                ...acc,
                pinNotes: [...acc.pinNotes, curr]
            }
        } else if (curr?.pin === false) {
            return acc = {
                ...acc,
                allNotes: [...acc.allNotes, curr]
            }
        }
    }

    useEffect(() => {
        console.log(userDataState)
        const notesData = userDataState.allNotes.reduce(reducerFn, intialValue)
        setNotes({ ...notesData })
    }, [userDataState])

    return (
        <div>
            <div>
                {!createNotes && <button onClick={() => setCreateNotes(!createNotes)} className="btn-sm btn-primary border-squre m-2"> + CreateNotes</button>}
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

