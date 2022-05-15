import { useState, useEffect } from "react";
import { findAllLabel } from "../../../utility";
import { useUserData } from "../../../context/user-data-context";
import { ColorPalettes, Label, TextArea } from "../components"
import { v4 as uuid } from "uuid";

export const NotesCardInput = ({ setNotesData, notesData }) => {
    const [label, setLabel] = useState([]);
    const { userDataState } = useUserData();
    const [activeBtn, setActivebtn] = useState();
    const [showLabel, setShowLabel] = useState(false);
    const [newLabel, setNewlabel] = useState("");

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
        const getLabel = findAllLabel(userDataState.allNotes);
        setLabel(getLabel);
    }, [userDataState]);

    const priorityType = [
        {
            id: 1,
            text: "High",
        },
        {
            id: 2,
            text: "Medium",
        },
        {
            id: 3,
            text: "Low",
        },
    ];

    const createLable = (e, oldLabels, currentLables) => {
        const findCreatedOrNot = oldLabels.find(
            (label) => label.label.toLowerCase() === e.target.value.toLowerCase().trim()
        );
        const findlabesCreatedOrNot = currentLables.find(
            (label) => label.label.toLowerCase() === e.target.value.toLowerCase().trim()
        );

        if (!findCreatedOrNot && !findlabesCreatedOrNot && e.target.value.trim().length > 0) {
            addInputValueTotheServer("label", [
                ...notesData.label,
                { _id: uuid(), label: e.target.value.trim() },
            ]);
            setNewlabel("");
        } else {
            alert("already exites");
        }
    };

    const removeSelectedLabel = (labelId, allSelectedLabels) => {
        const removeLabel = allSelectedLabels.filter((label) =>
            label._id === labelId ? false : true
        );
        addInputValueTotheServer("label", [...removeLabel]);
    };

    const checkAlredayAddLabelInCurrentNotes = (saveLabel, savedLabelDB) => {
        const findDataINsaveNotes = savedLabelDB.label.find(
            (label) => saveLabel._id === label._id
        );
        if (findDataINsaveNotes) {
            return true;
        }
    };

    return (
        <div className="input-section">
            <div className="note-card-heading">
                <TextArea textAreaState={{ textAreaAdjust, addInputValueTotheServer, style: "fs-md fw-700", placeholderText: "Type Heading", textAreaValue: notesData.heading, objctKey: "heading" }} />
                <button className="fa-solid fa-thumbtack  pin-btn btn-primary btn-sm border-round"></button>
            </div>
            <div className="note-card-content">
                <TextArea textAreaState={{ textAreaAdjust, addInputValueTotheServer, style: "fs-sm" , placeholderText: "Type Note", textAreaValue: notesData.noteDetail, objctKey: "noteDetail" }} />
            </div>
            <div className="p-1">
                <div>
                    <p> Select priority:</p>
                </div>
                <div className="d-flex gap-2">
                    {priorityType.map((type) => {
                        return (
                            <button
                                className={`btn-x-sm ${activeBtn === type.text ? "activeButton" : "btn-primary"
                                    }  border-pill`}
                                onClick={(e) => {
                                    addInputValueTotheServer("priority", type.text);
                                    setActivebtn(type.text);
                                }}
                                key={type.id}
                            >
                                {type.text}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div style={{ justifyContent: "space-between" }}>
                <div className="p-1">
                    <div>
                        <div className="d-flex gap-1 flex-wrap">
                            {notesData.label.length > 0 &&
                                notesData.label.map((label) => {
                                    return (
                                        <span key={label._id} className= "added-label" >
                                            {label.label}
                                            <i  className="fa fa-times mx-1"
                                                onClick={() => {
                                                    removeSelectedLabel(label._id, notesData.label);
                                                }}
                                            >        
                                            </i>
                                        </span>
                                    );
                                })}
                        </div>

                        <button
                            className="btn-sm btn-primary border-squre m-1"
                            onClick={() => {
                                setShowLabel(!showLabel);
                            }}
                        >
                            {showLabel ? "close" : "Add Label"}
                        </button>
                        {showLabel && <Label labelValue={{ label, checkAlredayAddLabelInCurrentNotes, removeSelectedLabel, notesData, newLabel, setNewlabel, createLable, addInputValueTotheServer }} />}
                    </div>
                </div>
                <ColorPalettes addInputValueTotheServer={addInputValueTotheServer} notesData={notesData} />
            </div>
        </div>
    );
};
