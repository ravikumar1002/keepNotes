
export const Priority = ({priority}) => {
    const {addInputValueTotheServer, priorityType } = priority

    return (
        <select onClick={(e) => {
            addInputValueTotheServer("priority", e.target.value.toLowerCase());
        }}
        className= "select"
        >
            <option value=""> Select priority: </option>
            {priorityType.map((type) => {
                return (
                    <option
                        key={type.id}
                        value ={type.text.toLowerCase()}
                    >
                        {type.text}
                    </option>
                );
            })}

        </select>
    )
}