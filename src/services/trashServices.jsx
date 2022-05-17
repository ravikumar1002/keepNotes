
import  { getTrash, postTrash, postRestoreTrash, deleteNotesInTrash } from "../api-calls"


export const getAllTrashItem = async (token, userDataDispatch) => {
    const TrashItem = await getTrash(token)
    console.log(TrashItem)
    userDataDispatch({
        type: "ALL_TRASH",
        payload: {
            trash: TrashItem.trash
        }
    })
}

export const postTrashItem = async (noteID, token, userDataDispatch) => {
    console.log(noteID, token, userDataDispatch)
    const TrashItem = await postTrash(noteID, token)
    console.log(TrashItem)
    userDataDispatch({
        type: "TRASH",
        payload: {
            trash: TrashItem.trash,
            notes: TrashItem.notes
        }
    })
}

export const postRestorerashItem = async (noteID, token, userDataDispatch)  => {
    const TrashItem = await postRestoreTrash(noteID, token)
    console.log(TrashItem)
    userDataDispatch({
        type: "TRASH",
        payload: {
            trash: TrashItem.trash,
            notes: TrashItem.notes
        }
    })
}

export const deleteNoteTrashItem = async (noteID, token, userDataDispatch) => {
    const TrashItem = await deleteNotesInTrash(noteID, token) 
    console.log(TrashItem)
    userDataDispatch({
        type: "ALL_TRASH",
        payload: {
            trash: TrashItem.trash
        }
    })
}
