
export const ShowSelectedLabel = ({selectedLabel}) => {
         const {notesData, removeSelectedLabel} = selectedLabel
    return (
        <div className={`d-flex gap-1 flex-wrap w-100 p-1`}>
            {notesData.label.length > 0 &&
                notesData.label.map((label) => {
                    return (
                        <span key={label._id} className="added-label" >
                            {label.label}
                            <i className="fa fa-times mx-1 pointer"
                                onClick={() => {
                                    removeSelectedLabel(label._id, notesData.label);
                                }}
                            >
                            </i>
                        </span>
                    );
                })}
        </div>
    )
}