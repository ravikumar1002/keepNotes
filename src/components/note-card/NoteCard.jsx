import { useState } from "react";
import { NotesCardInput } from "./components/NoteCardInput";
import { getCurrentDate , getCurrentTime} from "../../utility";
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
                            createNewNotes({...notesData, date:getCurrentDate(), updated: false }, token);
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
                        updateNotesFn( {...notesData,  date: getCurrentDate() , updated: true},notesValue._id, token,"Note Updated" )
                        setupdateNotes(false)
                    }}>Update</button>
                )}
            </div>
        </div>
    );
};
