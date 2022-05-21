import { useRef, useEffect, useState } from "react";
export const Label = ({ labelValue }) => {
    const {
        label,
        checkAlredayAddLabelInCurrentNotes,
        removeSelectedLabel,
        notesData,
        newLabel,
        setNewlabel,
        createLable,
        addInputValueTotheServer,
    } = labelValue;

    const container = useRef();
    const [templabel, setTempLabel] = useState()
    const [showLabel, setShowLabel] = useState(false);

    const handleClickOutside = (e) => {
        if (container?.current && !container?.current?.contains(e.target)) {
            setShowLabel(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div 
        className="container"
        ref={container}
        >
            <button
                className="btn-sm btn-primary border-squre"
                onClick={() => {
                    setShowLabel(!showLabel);
                }}
            >
                {showLabel ? "close" : "Add Label"}
            </button>
            {showLabel &&
                <ul className="list-style-none label-wrapper "
                >
                    {label.length > 0 &&
                        label.map((saveLabel) => {
                            return (
                                <li className="label-li" key={saveLabel._id}>
                                    <label htmlFor={saveLabel.label}>
                                        <input
                                            type="checkbox"
                                            id={saveLabel.label}
                                            className="label"
                                            checked={checkAlredayAddLabelInCurrentNotes(
                                                saveLabel,
                                                notesData
                                            )}
                                            onClick={(e) => {
                                                if (
                                                    checkAlredayAddLabelInCurrentNotes(saveLabel, notesData)
                                                ) {
                                                    removeSelectedLabel(saveLabel._id, notesData.label);
                                                } else {
                                                    addInputValueTotheServer("label", [
                                                        ...notesData.label,
                                                        { _id: saveLabel._id, label: e.target.id },
                                                    ]);
                                                }
                                            }}
                                        />
                                        <span>{saveLabel.label}</span>
                                    </label>
                                </li>
                            );
                        })}

                    <li className="label-li"
                    >
                        <input
                            type="text"
                            name="createLabel "
                            value={newLabel}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    createLable(e, label, notesData.label);
                                }
                            }}
                            placeholder= "Press Enter to add"
                            onChange={(e) => {
                                setNewlabel(e.target.value);
                                setTempLabel(e)
                            }}
                        />
                        <span onClick={() => {
                            createLable(templabel, label, notesData.label);
                        }}
                            className="fa fa-plus fs-sm px-1"
                        ></span>

                    </li>
                </ul>
            }
        </div>
    );
};
