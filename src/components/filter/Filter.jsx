import { useState, useEffect,useRef } from "react"
import { useUserData } from "../../context/user-data-context";
import { findAllLabel, filteredDateFn, sortByPriorityFn, sortByLabelFn } from "../../utility";
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
    const container = useRef();
    useEffect(() => {
        const getLabel = findAllLabel(userDataState.allNotes);
        setUserSaveLabel(getLabel);
    }, [userDataState]);

    const clearfilter = {
        date: "",
        priority: "",
        label: {},
    }

    const filterFunction = (allnotes, filteredInput) => {
        let sortByDate = filteredDateFn(allnotes, filteredInput)
        let sortByPriority = sortByPriorityFn(sortByDate, filteredInput)
        let sortByLabel = sortByLabelFn(sortByPriority, filteredInput)
        return sortByLabel
    }

    const checkedClickedORNote = (saveLabel, saveInput) => {
        if (saveLabel._id === saveInput.label._id) {
            return true
        }
        return false
    }

    useEffect(() => {
        const filteredNotesData = filterFunction(userDataState.allNotes, saveInput)
        userDataDispatch({
            type: "FILTER",
            payload: {
                filterData: filteredNotesData
            }
        })
    }, [saveInput, userDataState.allNotes])

    const handleClickOutside = (e) => {
        if (container?.current && !container?.current?.contains(e.target)) {
            setShowFilter(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div  className=" container" ref={container}>
            <div>
                <button onClick={() => {
                    setShowFilter(!showFilter)
                }} className="btn btn-sm btn-primary border-squre">filter</button>
            </div>
            {showFilter && <div className="filter-wrapper" >
                <div className=" flex-space-between gap-1">
                    <div  className="select-wrapper">
                        <label htmlFor="date">Sort By Date:</label>
                        <select name="date" id="date" onChange={(e) => {
                            setSaveInput((prev) => {
                                return {
                                    ...prev,
                                    date: e.target.value
                                }
                            })
                        }}
                        className = "select"
                        value = {saveInput.date}
                        >
                            <option value="">--Please choose an option--</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">oldest</option>
                        </select>
                    </div>
                    <div className="select-wrapper">
                        <label htmlFor="priority">Sort By priority:</label>
                        <select name="priority" id="priority" onChange={(e) => {
                            setSaveInput((prev) => {
                                return {
                                    ...prev,
                                    priority: e.target.value.toLowerCase()
                                }
                            })
                        }}
                        className = "select"
                        value = {saveInput.priority}
                        >
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
                            <ul className="d-flex gap-2 flex-wrap p-2 list-style-none">
                                {
                                    userSaveLabel.map((saveLabel) => {
                                        return (
                                            <li className="" key={saveLabel._id}>
                                                <button className={`btn btn-sm  border-squre ${checkedClickedORNote(saveLabel, saveInput) ? "activeFilterLabel" : "filterLabel"}`}  onClick={(e) => {
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
                                                                label: { ...saveLabel },
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
                <div className="d-flex mt-1" style={{justifyContent: "end"}} >
                    <button className="btn btn-sm btn-danger border-squre" onClick={() => {
                       setSaveInput({...clearfilter}) 
                    }}>Clear Filter</button>
                </div>
            </div>}
        </div>
    )
}