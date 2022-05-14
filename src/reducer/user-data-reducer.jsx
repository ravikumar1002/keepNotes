export const userData = (state, action) => {

    switch (action.type) {
        case "ALL_NOTES":
         return {
             ...state, 
             allNotes: action.payload.addedNote
         }
    
        default:
            break;
    }

}