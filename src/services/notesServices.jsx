import { getUserData, getNotes , postNotes, updateNotes, deleteNotes} from "../api-calls"


export const createNewNotesInDB = async(note, token, userDataDispatch) => {
    const dataNewNotes =  await postNotes(note, token)
    
    userDataDispatch({
        type: "ALL_NOTES",
        payload: {
            addedNote: dataNewNotes.notes
        }
    })
 }
  

 export const updateNotesInDB = async( note ,noteId, token, userDataDispatch) => {
    const updatedNote =  await updateNotes(note , noteId, token)

    userDataDispatch({
        type: "ALL_NOTES",
        payload: {
            addedNote: updatedNote.notes
        }
    })
 }