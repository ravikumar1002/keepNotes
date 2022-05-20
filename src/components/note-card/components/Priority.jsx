
export const Priority = ({ priority }) => {
    const { addInputValueTotheServer, priorityType, notesData } = priority

    return (
        <select onChange={(e) => {
            addInputValueTotheServer("priority", e.target.value.toLowerCase());
        }}
            value={notesData.priority}
            className="select"
        >
            <option value=""> Select priority: </option>
            {priorityType.map((type) => {
                return (
                    <option
                        key={type.id}
                        value={type.text.toLowerCase()}
                    >
                        {type.text}
                    </option>
                );
            })}

        </select>
    )
}