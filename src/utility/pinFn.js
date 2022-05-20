export const pinFn = (userDataState, intialValue) => {

  const reducerFn = (acc, curr) => {
    if (curr?.pin === true) {
      return (acc = {
        ...acc,
        pinNotes: [...acc.pinNotes, curr],
      });
    } else if (curr?.pin === false) {
      return (acc = {
        ...acc,
        allNotes: [...acc.allNotes, curr],
      });
    }
  };

  const notesData = userDataState.reduce(reducerFn, intialValue);
  return notesData;
};
