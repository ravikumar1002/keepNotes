import { useState, useEffect } from "react"
import { useUserData } from "../../context/user-data-context";
import { findAllLabel } from "../../utility";
import "./filter.css"
export const Filter = () => {
    const { userDataState, userDataDispatch } = useUserData();
    const [showFilter, setShowFilter] = useState(false)
    const [userSaveLabel, setUserSaveLabel] = useState([])
    const [saveInput, setSaveInput] = useState({
        date: "",
        priority: "",
        label: {},
    })
    useEffect(() => {
        const getLabel = findAllLabel(userDataState.allNotes);
        setUserSaveLabel(getLabel);
    }, [userDataState]);

    const clearfilter = {
        date: "",
        priority: "",
        label: {},
    }

    // const checkAlreadySelectedFilter = (saveLabel, savedLabelDB) => {
    //     const findCheckedLabel = savedLabelDB.label.find(
    //         (label) => saveLabel._id === label._id
    //     );
    //     if (findCheckedLabel) {
    //         return true;
    //     }
    // };

    const arrangeDateFormat = (date) => {
        const splitDate = date.split("/").reverse().join("/")
        const newDate = new Date(splitDate)
        return newDate
    }

    const filteredDateFn = (allnotes, filteredInput) => {
        let filteredbyDate;
        if (filteredInput.date === "newest") {
            return filteredbyDate = [...allnotes].sort((a, b) => arrangeDateFormat(b.date) - arrangeDateFormat(a.date))
        } else if (filteredInput.date === "oldest") {
            return filteredbyDate = [...allnotes].sort((a, b) => arrangeDateFormat(a.date) - arrangeDateFormat(b.date))
        }
        return filteredbyDate = [...allnotes]
    }

    const sortByPriorityFn = (sortByDate, filteredInput) => {
        const sortedPriority = sortByDate.filter((note) => note.priority === filteredInput.priority)
        if (filteredInput.priority) {
            return sortedPriority
        }
        return sortByDate
    }

    const sortByLabelFn = (allNotes, filteredInput) => {
        console.log(allNotes, filteredInput)
        const filteredNotes = allNotes.filter((note) => {

            let match = false
            const id = note.label.map((label) => label._id);
            match = id.includes(filteredInput.label?._id)  
            console.log(match)          
            return match

        })

        console.log(filteredNotes)
        if (filteredNotes) {
            return filteredNotes
        }
        return allNotes
    }


    const filterFunction = (allnotes, filteredInput) => {
        let sortByDate = filteredDateFn(allnotes, filteredInput)
        let sortByPriority = sortByPriorityFn(sortByDate, filteredInput)
        let sortByLabel = sortByLabelFn(sortByPriority, filteredInput)
        console.log(sortByLabel)
    }

    const checkedClickedORNote  = (saveLabel, saveInput) => {
        if(saveLabel._id === saveInput.label._id){
            return true
        }
          return false
    }




    useEffect(() => {
        filterFunction(userDataState.allNotes, saveInput)
    }, [saveInput])
    // console.log(saveInput)


    return (
        <div >
            <div>
                <button onClick={() => {
                    setShowFilter(!showFilter)
                }} className="btn btn-sm btn-primary border-squre">filter</button>
            </div>
            {showFilter && <div className="filter-wrapper" >
                <div className=" flex-space-between p-1">
                    <div>
                        <label htmlFor="date">Sort By Date:</label>
                        <select name="date" id="date" onChange={(e) => {
                            setSaveInput((prev) => {
                                return {
                                    ...prev,
                                    date: e.target.value
                                }
                            })
                        }}>
                            <option value="">--Please choose an option--</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">oldest</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority">Sort By priority:</label>
                        <select name="priority" id="priority" onChange={(e) => {
                            setSaveInput((prev) => {
                                return {
                                    ...prev,
                                    priority: e.target.value.toLowerCase()
                                }
                            })
                        }}>
                            <option value="">--Please choose an option--</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        {userSaveLabel.length > 0 &&
                            <ul className="filter-ul list-style-none">
                                {
                                    userSaveLabel.map((saveLabel) => {
                                        return (
                                            <li className="" key={saveLabel._id}>
                                                {/* <label htmlFor={saveLabel.label}>
                                                    <input
                                                        type="checkbox"
                                                        id={saveLabel.label}
                                                        className="label"
                                                        checked={checkedClickedORNote(saveLabel, saveInput)}
                                                        onClick={(e) => {
                                                            if (saveLabel._id === saveInput.label._id) {
                                                                setSaveInput((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        label: {},
                                                                    }
                                                                })
                                                            } else {
                                                                setSaveInput((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        label: {...saveLabel},
                                                                    }
                                                                })
                                                            }

                                                        }}
                                                    />
                                                    <span>{saveLabel.label}</span>
                                                </label> */}

                                                <button className="btn btn-sm btn-primary" style={{backgroundColor: `${checkedClickedORNote(saveLabel, saveInput)? "red" : "green"}`}} onClick= {(e) => {
                                                    if (saveLabel._id === saveInput.label._id) {
                                                        setSaveInput((prev) => {
                                                            return {
                                                                ...prev,
                                                                label: {},
                                                            }
                                                        })
                                                    } else {
                                                        setSaveInput((prev) => {
                                                            return {
                                                                ...prev,
                                                                label: {...saveLabel},
                                                            }
                                                        })
                                                    }

                                                }}>{saveLabel.label}</button>
                                            </li>
                                        );
                                    })}
                            </ul>}
                    </div>
                </div>
            </div>}
        </div>
    )
}