export const userData = (state, action) => {

    switch (action.type) {
        case "ALL_NOTES":
            return {
                ...state,
                allNotes: action.payload.addedNote
            }
        case "TRASH":
            return {
                ...state,
                trashNotes: action.payload.trash,
                allNotes: action.payload.notes
            }
        case "ALL_TRASH":
            return {
                ...state,
                trashNotes: action.payload.trash,
            }

        case "ALL_ARCHIVES":
            return {
                ...state,
                archiveNotes: action.payload.archives,
            }

        case "ARCHIVES":
            return {
                ...state,
                archiveNotes: action.payload.archives,
                allNotes: action.payload.notes
            }

        case "FILTER":
            return {
                ...state,
                filteredNotes: action.payload.filterData
            }

        case "LOGOUT":
            return {
                allNotes: [],
                archiveNotes: [],
                trashNotes: [],
                filteredNotes: [],
            }

        case "login":
            return {
                allNotes: action.payload.loginData.notes,
                archiveNotes: action.payload.loginData.archives,
                trashNotes: action.payload.loginData.trash,
                filteredNotes: []
            }

        default:
            break;
    }

}