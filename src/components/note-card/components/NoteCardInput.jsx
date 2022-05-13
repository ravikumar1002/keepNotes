import { useState } from "react"

export const NotesCardInput = () => {

    const [inputNoteData, setInputNotesData] = useState({
        heading: "",
        content: "",
    })

    function textAreaAdjust(e) {
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    return (
        <div className="input-section">
            <div className="note-card-heading">
                <textarea onChange={(e) => textAreaAdjust(e)} className="note-input-textarea fs-md fw-700" placeholder="Type Heading"></textarea>
                <button className="fa-solid fa-thumbtack  pin-btn btn-primary btn-sm border-round"></button>
            </div>
            <div className="note-card-content">
                <textarea onChange={(e) => textAreaAdjust(e)} className="note-input-textarea fs-sm" placeholder="Type Note"></textarea>
            </div>
            <div className="p-1">
                <label htmlFor="priority">Choose a priority:</label>
                <select name="priority" id="priority">
                    <option value="">--Please choose an option--</option>
                    <option value="high">High</option>
                    <option value="meduim">medium</option>
                    <option value="low">low</option>
                </select>
            </div>
            <div style={{justifyContent: "space-between"}}>
                <div className="my-1 p-1">
                    <label htmlFor="priority" className="mr-2">Choose a label:</label>
                    <select name="priority" id="priority">
                        <option value="">--Please choose an option--</option>
                        <option value="high">High</option>
                        <option value="meduim">medium</option>
                        <option value="low">low</option>
                    </select>
                </div>
                <div className="note-card-footer">
                    <div className="d-flex gap-1">
                        <button className="btn-primary btn-sm border-round">
                            <label htmlFor="color-select" className="fa-solid fa-palette"></label>
                            <input type="color" id="color-select" style={{ position: "absolute", visibility: "hidden" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 