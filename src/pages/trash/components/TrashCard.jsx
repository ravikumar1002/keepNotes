
import { postRestorerashItem, deleteNoteTrashItem } from "../../../services"
import { useUserData } from "../../../context/user-data-context"
import { useAuth } from "../../../context/auth-context"
import "./trash-card.css"
const TrashCard = ({ trashNote }) => {
    const { token } = useAuth()
    const { userDataState, userDataDispatch } = useUserData()
    return (
        <div style={{ backgroundColor: trashNote.color }} className="trash-card">
            <div >
                { trashNote?.heading.length > 0 && <h1>{trashNote?.heading}</h1>}
                { trashNote?.noteDetail.length > 0 && <p>{trashNote?.noteDetail}</p>}
                <div className="p-1 d-flex gap-1 flex-wrap">
                    {trashNote?.priority.length > 0 && <span>{trashNote?.priority}</span>}
                    {
                        trashNote?.label.length > 0  && trashNote?.label.map((label) => {
                            return (
                                <span key={label._id} className="added-label">{label.label}</span>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <button className="btn-sm" onClick={() => {
                    deleteNoteTrashItem(trashNote._id, token, userDataDispatch)
                }}>🔻 </button>
                <button className="btn-sm" onClick={() => {
                    postRestorerashItem(trashNote._id, token, userDataDispatch)
                }}>👆</button>
            </div>
        </div>
    )
}

export default TrashCard