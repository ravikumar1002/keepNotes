import { useState, useEffect } from "react";
import { findAllLabel } from "../../../utility";
import { useUserData } from "../../../context/user-data-context";

export const NotesCardInput = ({ setNotesData, notesData }) => {
    const [label, setAllLabel] = useState([])
    const { userDataState } = useUserData()
    

    function textAreaAdjust(e) {
        e.target.style.height = "1px";
        e.target.style.height = e.target.scrollHeight + "px";
    }

    const addInputValueTotheServer = (key, value) => {
        setNotesData((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    useEffect(() => {
      const getLabel =   findAllLabel(userDataState.allNotes)
      setAllLabel(getLabel)
    }, [])


    return (
        <div className="input-section">
            <div className="note-card-heading">
                <textarea
                    onChange={(e) => {
                        textAreaAdjust(e);
                        addInputValueTotheServer("heading", e.target.value);
                    }}
                    value={notesData.heading}
                    className="note-input-textarea fs-md fw-700"
                    placeholder="Type Heading"
                ></textarea>
                <button className="fa-solid fa-thumbtack  pin-btn btn-primary btn-sm border-round"></button>
            </div>
            <div className="note-card-content">
                <textarea
                    onChange={(e) => {
                        textAreaAdjust(e);
                        addInputValueTotheServer("noteDetail", e.target.value);
                    }}
                    value={notesData.noteDetail}
                    className="note-input-textarea fs-sm"
                    placeholder="Type Note"

                ></textarea>
            </div>
            <div className="p-1">
                <label htmlFor="priority">Choose a priority:</label>
                <select
                    name="priority"
                    id="priority"
                    onChange={(e) => {
                        addInputValueTotheServer("priority", e.target.value);
                    }}
                    value={notesData.priority}
                >
                    <option value="">--Please choose an option--</option>
                    <option value="high">High</option>
                    <option value="meduim">medium</option>
                    <option value="low">low</option>
                </select>
            </div>
            <div style={{ justifyContent: "space-between" }}>
                <div className="my-1 p-1">
                    <label htmlFor="label" className="mr-2">
                        Choose a label:
                    </label>
                    <select
                        name="label"
                        id="label"
                        onChange={(e) => {
                            addInputValueTotheServer("label", e.target.value);
                        }}
                        value={notesData.label}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="home">home</option>
                        <option value="work">work</option>
                    </select>
                </div>
                <div className="note-card-footer">
                    <div className="d-flex gap-1">
                        {/* <button className="btn-primary border-round"> */}
                            <label
                                htmlFor="color-select"
                                // className="fa-solid fa-palette"
                            ></label>
                            <input
                                type="color"
                                id="color-select"
                                value = {notesData.color}
                                onChange={(e) => {
                                    addInputValueTotheServer("color", e.target.value);
                                }}
                            />
                        {/* </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
