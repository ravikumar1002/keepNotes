export const Label = ({ av }) => {
    const {
        label,
        checkAlredayAddLabelInCurrentNotes,
        removeSelectedLabel,
        notesData,
        newLabel,
        setNewlabel,
        createLable,
        addInputValueTotheServer,
    } = av;
    return (
        <ul className="list-style-none label-wrapper">
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

            <li className="label-li">
                <input
                    type="text"
                    name=""
                    id=""
                    value={newLabel}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            createLable(e, label, notesData.label);
                        }
                    }}
                    onChange={(e) => {
                        setNewlabel(e.target.value);
                    }}
                />
            </li>
        </ul>
    );
};
