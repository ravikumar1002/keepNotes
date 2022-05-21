import { useState, useEffect } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useUserData } from "../../context/user-data-context"
import { SaveNotes } from "../../components"

export const Label = () => {
    const [selectesLabel, setSelectedLabel] = useState([])
    const { label } = useParams()
    const navigate = useNavigate()
    const { userDataState, userDataDispatch } = useUserData();

    const showSelectedLabel = (allNotes, selectLabelLabel) => {
        const filteredNotes = allNotes.filter((note) => {
            let match = false;
            const id = note.label.map((label) => label.label);
            match = id.includes(selectLabelLabel);
            return match;
        });
        return filteredNotes;
    }

    const filterFunction = (allnotes, label) => {
        let selectedLabelData = showSelectedLabel(allnotes, label)
        setSelectedLabel(selectedLabelData)
        if(selectedLabelData.length === 0 ){
            navigate("/")
        }
    }

    useEffect(() => {
        filterFunction(userDataState.allNotes, label)
    }, [label, userDataState.allNotes])

    return (
        <div>
            {selectesLabel.length > 0 && selectesLabel.map((labelNotes) => {
                return (
                    <SaveNotes userCreatedNotes={labelNotes} key={labelNotes._id} path = {`/label/${label}`} />
                )
            })}

            {/* {userDataState.allNotes.length === 0 && <Navigate to="/" replace />} */}
        </div>
    )
}