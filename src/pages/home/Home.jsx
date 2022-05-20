import "./home.css"
import { useAuth } from "../../context/auth-context"
import { SaveNotes, NoteCard } from "../../components"
import { createNewNotesInDB } from "../../services"
import { useEffect, useState } from "react"
import { useUserData } from "../../context/user-data-context"
import { pinFn } from "../../utility"

export const dummyData = [
    {
        heading: "111",
        noteDetail: "",
        priority: "",
        label: [],
        color: "",
        pin: false,
    },
    {
        heading: "222",
        noteDetail: "",
        priority: "",
        label: [],
        color: "",
        pin: false,
    },
    {
        heading: "333",
        noteDetail: "",
        priority: "",
        label: [],
        color: "",
        pin: false,
    },
    {
        heading: "mix-1",
        noteDetail: "",
        priority: "",
        label: [],
        color: "",
        pin: false,
    }, {
        heading: "mix-2",
        noteDetail: "",
        priority: "",
        label: [],
        color: "",
        pin: false,
    }
]

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
        const notesData = pinFn(userDataState.allNotes, intialValue)
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

