export const TextArea = ({ textAreaState }) => {
    const {
        textAreaAdjust,
        addInputValueTotheServer,
        style,
        placeholderText,
        textAreaValue,
        objctKey,
    } = textAreaState;
    return (
        <textarea
            onChange={(e) => {
                textAreaAdjust(e);
                addInputValueTotheServer(objctKey, e.target.value);
            }}
            value={textAreaValue}
            className={`note-input-textarea ${style}`}
            placeholder={`${placeholderText}`}
        ></textarea>
    );
};
