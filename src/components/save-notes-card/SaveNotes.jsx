
export const SaveNotes = ({ }) => {

    return (
        <div className="note-card">
            <div className="input-section">
                <div className="note-card-heading">
                    <h2 className="note-input-textarea">hhhhhh</h2>
                    <button className="fa-solid fa-thumbtack  pin-btn btn-primary btn-sm border-round"></button>
                </div>
                <div className="note-card-content">
                    <p className="note-input-textarea">sssssss</p>
                </div>
            </div>
                <div className=" p-1 d-flex gap-1">
                    <div className="btn-secondary btn-x-sm border-pill">high</div>
                    <div className="btn-secondary btn-x-sm border-pill">Label</div>
                </div>
            <div className="flex-space-between p-1 d-flex gap-1">
                <div>
                    <p>created on</p>
                </div>
                <div className="align-self-start d-flex gap-1">
                    <button className="btn-primary btn-sm border-round">
                        <i className="fa-solid fa-box-archive"></i>
                    </button>
                    <button className="btn-primary btn-sm border-round">
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn-danger btn-sm border-round">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}