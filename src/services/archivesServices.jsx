import  {getArchives, postArchives, postRestoreArchives, deleteNotesInArchives} from "../api-calls"



export const getAllArchivesItem = async (token, userDataDispatch) => {
    const archivesItem = await getArchives(token)
    userDataDispatch({
        type: "ALL_ARCHIVES",
        payload: {
            archives: archivesItem.archives
        }
    })
}

export const postArchivesItem = async (noteID, note, token, userDataDispatch) => {
    const archivesItem = await postArchives(noteID,note, token)
    userDataDispatch({
        type: "ARCHIVES",
        payload: {
            archives: archivesItem.archives,
            notes: archivesItem.notes
        }
    })
}

export const postRestoreArchivesItem = async (noteID, token, userDataDispatch)  => {
    const archivesItem = await postRestoreArchives(noteID, token)
    userDataDispatch({
        type: "ARCHIVES",
        payload: {
            archives: archivesItem.archives,
            notes: archivesItem.notes
        }
    })
}

export const deleteNoteArchivesItem = async (noteID, token, userDataDispatch) => {
    const archivesItem = await deleteNotesInArchives(noteID, token) 
    userDataDispatch({
        type: "ALL_ARCHIVES",
        payload: {
            archives: archivesItem.archives
        }
    })
}
