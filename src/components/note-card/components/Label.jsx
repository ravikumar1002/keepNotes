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
            className="container auto-suggestion"
            ref={container}
        >

            <div className="input-div">
                <input
                    type="text"
                    name="createLabel "
                    value={newLabel}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            createLable(e, label, notesData.label);
                        }
                    }}
                    placeholder="Press Enter to add"
                    onChange={(e) => {
                        setNewlabel(e.target.value);
                        setTempLabel(e)
                    }}
                    onFocus={() => {
                        setShowLabel(!showLabel)
                    }}
                />
            </div>

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
                </ul>
            }


        </div>
    );
};
