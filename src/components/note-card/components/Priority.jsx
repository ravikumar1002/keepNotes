
export const Priority = ({priority}) => {
    const {addInputValueTotheServer, priorityType } = priority

    return (
        <select onClick={(e) => {
            addInputValueTotheServer("priority", e.target.value);
        }}
        className= "select"
        >
            <option value=""> Select priority: </option>
            {priorityType.map((type) => {
                return (
                    <option
                        key={type.id}
                    >
                        {type.text}
                    </option>
                );
            })}

        </select>
    )
}