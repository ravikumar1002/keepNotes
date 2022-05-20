export const arrangeDateFormat = (date) => {
  const splitDate = date.split("/").reverse().join("/");
  const newDate = new Date(splitDate);
  return newDate;
};

export const filteredDateFn = (allnotes, filteredInput) => {
  let filteredbyDate;
  if (filteredInput.date === "newest") {
    return (filteredbyDate = [...allnotes].sort(
      (a, b) => arrangeDateFormat(b.date) - arrangeDateFormat(a.date)
    ));
  } else if (filteredInput.date === "oldest") {
    return (filteredbyDate = [...allnotes].sort(
      (a, b) => arrangeDateFormat(a.date) - arrangeDateFormat(b.date)
    ));
  }
  return (filteredbyDate = [...allnotes]);
};

export const sortByPriorityFn = (sortByDate, filteredInput) => {
  const sortedPriority = sortByDate.filter(
    (note) => note.priority === filteredInput.priority
  );
  if (filteredInput.priority) {
    return sortedPriority;
  }
  return sortByDate;
};

export const sortByLabelFn = (allNotes, filteredInput) => {
  const filteredNotes = allNotes.filter((note) => {
    let match = false;
    const id = note.label.map((label) => label._id);
    match = id.includes(filteredInput.label?._id);
    return match;
  });
  if (filteredNotes) {
    return filteredNotes;
  }
  return allNotes;
};
