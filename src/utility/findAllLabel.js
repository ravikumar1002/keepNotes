export const findAllLabel = (state) => {
    console.log(state)
    const labelData = state.filter((note) => {
        console.log(note, note.label)
       return note.label.length > 0 ? note.label : false
    })
    console.log(labelData)
}