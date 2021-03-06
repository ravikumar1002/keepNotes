import { useState, useEffect } from "react";
import { findAllLabel } from "../../../utility";
import { useUserData } from "../../../context/user-data-context";
import {
    ColorPalettes,
    Label,
    TextArea,
    Priority,
    ShowSelectedLabel,
} from "../components";
import { v4 as uuid } from "uuid";

export const NotesCardInput = ({ setNotesData, notesData }) => {
    const [label, setLabel] = useState([]);
    const { userDataState } = useUserData();
    const [newLabel, setNewlabel] = useState("");

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
            (label) =>
                label.label.toLowerCase() === e.target.value.toLowerCase().trim()
        );
        const findlabesCreatedOrNot = currentLables.find(
            (label) =>
                label.label.toLowerCase() === e.target.value.toLowerCase().trim()
        );

        if (
            !findCreatedOrNot &&
            !findlabesCreatedOrNot &&
            e.target.value.trim().length > 0
        ) {
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
                <TextArea
                    textAreaState={{
                        addInputValueTotheServer,
                        style: "fs-md fw-700",
                        placeholderText: "Type Heading",
                        textAreaValue: notesData.heading,
                        objctKey: "heading",
                    }}
                />
                {notesData.pin === true ? <button className="fas fa-thumbtack btn-sm border-squre align_self-flex-start" style={{color: "#6610f2"}}  onClick={() => {
                    addInputValueTotheServer("pin", false)
                }} ></button> :
                    <button className="fas fa-thumbtack btn-sm border-squre align_self-flex-start" style={{color: "black"}} onClick={() => {
                        addInputValueTotheServer("pin", true)
                    }}></button>
                }
            </div>
            <div className="note-card-content">
                <TextArea
                    textAreaState={{
                        addInputValueTotheServer,
                        style: "fs-sm",
                        placeholderText: "Type Note",
                        textAreaValue: notesData.noteDetail,
                        objctKey: "noteDetail",
                    }}
                />
            </div>
            <div className="p-1">
                <Priority priority={{ addInputValueTotheServer, priorityType,notesData  }} />
            </div>
            <div className="flex-col py-1">
                {notesData.label.length > 0 ?  <ShowSelectedLabel selectedLabel={{ notesData, removeSelectedLabel }} /> : <h4  className="w-100 px-1">Add Label</h4> }
                <div className="p-1 w-100">
                    <div className="flex-space_between-align-item_center pos-rel">
                        <Label
                            labelValue={{
                                label,
                                checkAlredayAddLabelInCurrentNotes,
                                removeSelectedLabel,
                                notesData,
                                newLabel,
                                setNewlabel,
                                createLable,
                                addInputValueTotheServer,
                            }}
                        />

                        <ColorPalettes
                            addInputValueTotheServer={addInputValueTotheServer}
                            notesData={notesData}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};
