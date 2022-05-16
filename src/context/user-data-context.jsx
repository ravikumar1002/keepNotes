import { useContext, useReducer, createContext } from "react";
import { userData } from "../reducer";

const userDataContext = createContext()

const UserDataProvider = ({ children }) => {
    const userIntialData = {
        allNotes: [],
        archiveNotes: [],
        trashNotees: [],
        pinNotes: [],
    }
    const [userDataState, userDataDispatch] = useReducer(userData, userIntialData)

    return (
        <userDataContext.Provider value={{ userDataState, userDataDispatch }}>
            {children}
        </userDataContext.Provider>
    )

}

const useUserData = () => useContext(userDataContext)

export { useUserData, UserDataProvider }