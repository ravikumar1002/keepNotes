export const ColorPalettes = ({ addInputValueTotheServer, notesData }) => {
    return (
            <div className="d-flex gap-1">
                <label htmlFor="color-select"></label>
                <input
                    type="color"
                    id="color-select"
                    value={notesData.color}
                    onChange={(e) => {
                        addInputValueTotheServer("color", e.target.value);
                    }}
                />
            </div>
    );
};
