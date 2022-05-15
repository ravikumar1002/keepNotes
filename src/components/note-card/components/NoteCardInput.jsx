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
    const [showLabel, setShowLabel] = useState(false);
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
                <button className="fa-solid fa-thumbtack  pin-btn btn-primary btn-sm border-round align_self-flex-start"></button>
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
                <Priority priority={{ addInputValueTotheServer, priorityType }} />
            </div>
            <div className="flex-col">
                <ShowSelectedLabel selectedLabel={{ notesData, removeSelectedLabel }} />
                <div className="p-1 w-100">
                    <div className="flex-space_between-align-item_center pos-rel">
                        <button
                            className="btn-sm btn-primary border-squre"
                            onClick={() => {
                                setShowLabel(!showLabel);
                            }}
                        >
                            {showLabel ? "close" : "Add Label"}
                        </button>
                        <ColorPalettes
                            addInputValueTotheServer={addInputValueTotheServer}
                            notesData={notesData}
                        />
                        {showLabel && (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
