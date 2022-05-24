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
        const notesData = pinFn(userDataState?.filteredNotes, intialValue)
        setNotes({ ...notesData })
    }, [userDataState])

    return (
        <div>
            <div>
                {!createNotes && <div>
                    <button onClick={() => setCreateNotes(!createNotes)} className="btn-sm btn-primary border-squre m-2"> + CreateNotes</button>
                </div>
                }
                <div className= {`${ createNotes  ? "grid-layout" : " "}`}>
                {createNotes && <NoteCard createNotes={createNotes} setCreateNotes={setCreateNotes} token={token} createNewNotes={createNewNotes}  />}
                </div>
            </div>
            { notes?.pinNotes.length > 0 && <p className="fs-md fw-700 p-1">Pin notes</p> }
            <div className={`${notes?.pinNotes.length > 0 ?  "grid-layout" : " "}`}>
                {notes?.pinNotes.length > 0 && notes?.pinNotes.map((note) => {
                    return (
                        <SaveNotes userCreatedNotes={note} key={note._id} />
                    )
                })
                }
            </div>
            <p className="fs-md fw-700 p-1">All notes</p>
            <div className=" grid-layout">
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

