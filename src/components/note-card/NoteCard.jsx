import { useState } from "react";
import { NotesCardInput } from "./components/NoteCardInput";
import "./note-card.css";
export const NoteCard = ({
    createNotes,
    updateNotes,
    notesValue,
    setCreateNotes,
    setupdateNotes,
    createNewNotes,
    updateNotesFn,
    token,
}) => {
    const defaultValue = {
        heading: "",
        noteDetail: "",
        priority: "",
        label: [],
        color: "",
        pin: false,
    };

    const [notesData, setNotesData] = useState(
        updateNotes ? { ...notesValue } : { ...defaultValue }
    );

console.log(notesData)

    return (
        <div
            className="note-card"
            style={{ backgroundColor: `${notesData.color}` }}
        >
            <NotesCardInput setNotesData={setNotesData} notesData={notesData} />
            <div className="flex-space-between mt-1 ">
                {createNotes && (
                    <button
                        className="btn-sm btn-danger border-squre"
                        onClick={() => {
                            setCreateNotes(false)
                        }}
                    >
                        Cancel
                    </button>
                )}
                {createNotes && (
                    <button
                        className="btn-sm btn-primary border-squre"
                        onClick={() => {
                            createNewNotes(notesData, token);
                            setNotesData({ ...defaultValue });
                            setCreateNotes(false)

                        }}
                    >
                        create
                    </button>
                )}

                {updateNotes && (
                    <button
                        className="btn-sm btn-danger border-squre"
                        onClick={() => {
                            setupdateNotes(false)
                        }}
                    >
                        Cancel
                    </button>
                )}
                {updateNotes && (
                    <button className="btn-sm btn-primary border-squre" onClick={() => {
                        console.log(notesValue)
                        updateNotesFn( notesData,notesValue._id, token)
                        setupdateNotes(false)
                    }}>Update</button>
                )}
            </div>
        </div>
    );
};
