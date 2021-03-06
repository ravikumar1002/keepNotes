export const getCurrentDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
};

export const getCurrentTime = () => {
    let today = new Date();
    let time = `${today.getHours()} : ${today.getMinutes()} : ${today.getSeconds()}`
    return time
};
