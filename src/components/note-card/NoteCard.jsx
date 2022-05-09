import { NotesCardInput } from "./components/NoteCardInput"
import "./note-card.css"
export const NoteCard = ({ }) => {
    const createNotes = false
    const updateNotes = true

    return (
        <div className="note-card">
            <NotesCardInput />
            <div className="flex-space-between mt-1 ">
                <button className="btn-sm btn-danger border-squre" >Cancel</button>
                {
                    createNotes &&
                    <button className="btn-sm btn-primary border-squre">create</button>
                }
                {
                    updateNotes &&
                    <button className="btn-sm btn-primary border-squre">Update</button>
                }
            </div>
        </div>
    )
}