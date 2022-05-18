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
        
        default:
            break;
    }

}