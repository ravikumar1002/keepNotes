import { useState } from "react";
import { NoteCard } from "../note-card/NoteCard";
import { useAuth } from "../../context/auth-context";
import { updateNotesInDB, postTrashItem, postArchivesItem, deleteNoteArchivesItem, postRestoreArchivesItem } from "../../services";
import { useUserData } from "../../context/user-data-context";
import { useLocation } from "react-router-dom";

export const SaveNotes = ({ userCreatedNotes }) => {
    const location = useLocation()
    const [updateNotes, setupdateNotes] = useState(false);
    const { userDataDispatch } = useUserData()
    const { token } = useAuth()
    const updateNotesFn = (updatedNotes, oldNotesId, token, msg) => {
        updateNotesInDB(updatedNotes, oldNotesId, token, userDataDispatch, msg)
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
                        <div className="note-card-heading mb-1 w-100% flex-between">
                            <h2 className="word-break-all">
                                {userCreatedNotes.heading}
                            </h2>
                            {location.pathname === "/"  && (userCreatedNotes.pin === true ? <button className="fas fa-thumbtack btn-sm border-squre align_self-flex-start" onClick={() => {
                                updateNotesFn({...userCreatedNotes, pin: false}, userCreatedNotes._id, token, "Notes Unpin")
                            }} ></button> :
                                <button className="far fa-thumbtack btn-sm border-squre align_self-flex-start" onClick={() => {
                                    updateNotesFn({...userCreatedNotes, pin: true}, userCreatedNotes._id, token, "Notes Pin")
                                }}></button>
                            )}
                        </div>
                        <div className="note-card-content mb-1 mt-1">
                            <p className="word-break-all">
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
                        <div className="flex-col" style={{ marginRight: "5px" }}>
                            <small>{userCreatedNotes?.updated ? "Updates On" : "Created On"}</small>
                            <small>{userCreatedNotes?.date}</small>
                        </div>
                        <div className="align-self-start d-flex gap-1">
                            {location.pathname === "/archives" && <button
                                className="btn-primary btn-sm border-squre"
                                onClick={() => { postRestoreArchivesItem(userCreatedNotes._id, token, userDataDispatch) }}
                            >
                                <i className="material-icons">unarchive</i>
                            </button>}
                            {location.pathname === "/" && <button className="btn-primary btn-sm border-squre" onClick={(e) => {
                                postArchivesItem(userCreatedNotes._id, userCreatedNotes, token, userDataDispatch)
                            }}>
                                <i className="fa-solid fa-box-archive"></i>
                            </button>}

                            {location.pathname === "/" && <button
                                className="btn-primary btn-sm border-squre"
                                onClick={() => { setupdateNotes(true) }}
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>}
                            <button className="btn-danger btn-sm border-squre" onClick={() => {
                                if (location.pathname === "/") {
                                    postTrashItem(userCreatedNotes._id, token, userDataDispatch)
                                } else if (location.pathname === "/archives") {
                                    deleteNoteArchivesItem(userCreatedNotes._id, token, userDataDispatch)
                                }
                            }}>
                                <i className="fa-solid fa-trash"></i>
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
