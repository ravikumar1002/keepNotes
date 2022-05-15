import { useState } from "react";
import { NoteCard } from "../note-card/NoteCard";
import { useAuth } from "../../context/auth-context";
import { updateNotesInDB } from "../../services/notesServices";
import { useUserData } from "../../context/user-data-context";

export const SaveNotes = ({ userCreatedNotes }) => {
    const [updateNotes, setupdateNotes] = useState(false);
    const { userDataDispatch } = useUserData()
    const {token}= useAuth()
    const updateNotesFn = (updatedNotes,oldNotesId,  token) => { 
        updateNotesInDB( updatedNotes,oldNotesId, token, userDataDispatch)
    };

    return (
        <>
            {updateNotes ? (
                <NoteCard
                    updateNotes={updateNotes}
                    notesValue={userCreatedNotes}
                    setupdateNotes={setupdateNotes}
                    token={token}
                    updateNotesFn={updateNotesFn}
                />
            ) : (
                <div
                    className="note-card"
                    style={{ backgroundColor: `${userCreatedNotes.color}` }}
                >
                    <div className="input-section">
                        <div className="note-card-heading">
                            <h2 className="note-input-textarea">
                                {userCreatedNotes.heading}
                            </h2>
                            <button className="fa-solid fa-thumbtack  pin-btn btn-primary btn-sm border-round"></button>
                        </div>
                        <div className="note-card-content">
                            <p className="note-input-textarea">
                                {userCreatedNotes.noteDetail}
                            </p>
                        </div>
                    </div>
                    <div className="p-1 d-flex gap-1 flex-wrap">
                        {userCreatedNotes.priority && (
                            <span className="added-label" >
                                {userCreatedNotes.priority}
                            </span>
                        )}
                        {userCreatedNotes.label.length > 0 &&
                            userCreatedNotes.label.map((label) => {
                                return (
                                    <span className="added-label" key={label._id}>
                                        {label.label}
                                    </span>
                                );
                            })}
                    </div>
                    <div className="flex-space-between p-1 d-flex gap-1">
                        <div>
                            <p>created on</p>
                        </div>
                        <div className="align-self-start d-flex gap-1">
                            <button className="btn-primary btn-sm border-round">
                                <i className="fa-solid fa-box-archive"></i>
                            </button>
                            <button
                                className="btn-primary btn-sm border-round"
                                onClick={() => { setupdateNotes(true)}}
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn-danger btn-sm border-round">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
