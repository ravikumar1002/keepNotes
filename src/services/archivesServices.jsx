import  {getArchives, postArchives, postRestoreArchives, deleteNotesInArchives} from "../api-calls"



export const getAllArchivesItem = async (token, userDataDispatch) => {
    const archivesItem = await getArchives(token)
    console.log(archivesItem)
    userDataDispatch({
        type: "ALL_ARCHIVES",
        payload: {
            archives: archivesItem.archives
        }
    })
}

export const postArchivesItem = async (noteID, note, token, userDataDispatch) => {
    console.log (noteID, note, token, userDataDispatch)
    const archivesItem = await postArchives(noteID,note, token)
    console.log(archivesItem)
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
    console.log(archivesItem)
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
    console.log(archivesItem)
    userDataDispatch({
        type: "ALL_ARCHIVES",
        payload: {
            archives: archivesItem.archives
        }
    })
}
