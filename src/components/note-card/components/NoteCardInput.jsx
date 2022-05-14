import { useState, useEffect } from "react";
import { findAllLabel } from "../../../utility";
import { useUserData } from "../../../context/user-data-context";
import { v4 as uuid } from 'uuid';

export const NotesCardInput = ({ setNotesData, notesData }) => {
    const [label, setLabel] = useState([])
    const { userDataState } = useUserData()
    const [activeBtn, setActivebtn] = useState()
    const [showLabel, setShowLabel] = useState(false)
    const [showSelectedLabel, setShowSelectedLabel] = useState([])
    const [newLabel, setNewlabel] = useState("")

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
        const getLabel = findAllLabel(userDataState.allNotes)
        setLabel(getLabel)

    }, [])

    useEffect(() => {
        console.log(label,showSelectedLabel)
    }, [showSelectedLabel])


    const priorityType = [{
        id: 1,
        text: "High"
    },
    {
        id: 2,
        text: "Medium"
    },
    {
        id: 3,
        text: "Low"
    },
    ]

    const createLable = (e, oldLabels, currentLables) => {
        const findCreatedOrNot = oldLabels.find((label) => label.label.toLowerCase() === e.target.value.toLowerCase())
        const findlabesCreatedOrNot = currentLables.find((label) => label.label.toLowerCase() === e.target.value.toLowerCase())

        if (!findCreatedOrNot && !findlabesCreatedOrNot) {
            setShowSelectedLabel((prev) => [...prev, { _id: uuid(), label: e.target.value }])
            setNewlabel("")
        }else {
            alert("already exites")
        }
    }

    const revoveSelectedLabel = (labelId, allSelectedLabels) => {
        const removeLabel = allSelectedLabels.filter(label => label._id === labelId ? false : true)
        setShowSelectedLabel([...removeLabel])
    }

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
                <div>
                    <p> Select priority:</p>
                </div>
                <div
                    className="d-flex gap-2"
                >
                    {priorityType.map((type) => {
                        return (
                            <button className={`btn-x-sm ${activeBtn === type.text ? "activeButton" : "btn-primary"}  border-pill`} onClick={(e) => {
                                addInputValueTotheServer("priority", type.text);
                                setActivebtn(type.text)
                            }} key={type.id}>{type.text}</button>
                        )
                    })
                    }
                </div>
            </div>
            <div style={{ justifyContent: "space-between" }}>
                <div className="my-1 p-1">

                    <div>
                        <div>
                            {showSelectedLabel.length > 0 && showSelectedLabel.map((label) => {
                                return (
                                    <span key={label._id}>{label.label} <i onClick={() => {
                                        revoveSelectedLabel(label._id, showSelectedLabel)
                                    }}> +</i></span>
                                )
                            })}
                        </div>

                        <button className="btn-sm btn-primary border-squre" onClick={() => {
                            setShowLabel(!showLabel)
                        }}>{showLabel ? "close" : "Add"}</button>

                        {showLabel && <ul className="list-style-none label-wrapper">
                            <li className="label-li">
                                <label htmlFor="home">
                                    <input type="checkbox" id="home" className="label" onClick={(e) => {
                                        addInputValueTotheServer("label", [...notesData.label, { _id: uuid(), label: e.target.id }]);
                                        setShowSelectedLabel((prev) => [...prev, { _id: uuid(), label: e.target.id }])
                                    }} />
                                    <span>Home</span>
                                </label>
                            </li>
                            <li className="label-li">
                                <label htmlFor="WORK">
                                    <input type="checkbox" id="WORK" className="label" onClick={(e) => {
                                        addInputValueTotheServer("label", [...notesData.label, { _id: uuid(), label: e.target.id }]);
                                        setShowSelectedLabel((prev) => [...prev, { _id: uuid(), label: e.target.id }])
                                    }} />
                                    <span>WORK</span>
                                </label>
                            </li>

                            <li className="label-li">
                                <input type="text" name="" id="" value={newLabel} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        createLable(e, label,showSelectedLabel )
                                    }
                                }} onChange={(e) => {
                                    setNewlabel(e.target.value)
                                }} />
                            </li>
                        </ul>}
                    </div>

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
                            value={notesData.color}
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
