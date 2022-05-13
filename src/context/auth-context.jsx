import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signupHandler, loginHandler } from "../api-calls/auth-api";

export const authContext = createContext({})
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        encodedToken: '',
        userData: {}
    })

    const navigate = useNavigate()
    const location = useLocation()

    const setLocalStroge = (token, data) => {
        localStorage.setItem(
            'userHasLogged',
            JSON.stringify({ token: token, user: data })
        );
    }

    const setData = (token, data) => {
        setUser({
            encodedToken: token,
            userData: data,
        })
    }

    const setPath = (path) => {
        if (!path?.state?.from) {
            if (path.state) {
                navigate(path?.state)
            } else {
                navigate(path?.pathname)
            }
        } else {
            navigate(path?.state?.from?.pathname)
        }
    }

    const userSignUp = async ({ email, password, name}, path) => {
        const data = await signupHandler(email, password, name)
        setLocalStroge(data.encodedToken,data?.createdUser )
        setData(data.encodedToken,data?.createdUser )
        setPath(path)
    }

    const userlogin = async ({ email, password }, path) => {
        const data = await loginHandler(email, password)
        setLocalStroge(data.encodedToken,data?.foundUser )
        setData(data.encodedToken,data?.foundUser )
        setPath(path)
    }

    const logout = () => {
        setUser({
            encodedToken: '',
            userData: {}
        })
        localStorage.clear()
    }

    const getLocalData = async (path) => {
        const localStrogeItem = await { ...JSON.parse(localStorage.getItem("userHasLogged")).user }
        await userSignUp({
            email: localStrogeItem.email,
            password: localStrogeItem.password,
            name: localStrogeItem.name
        }, path)
    }

    useEffect(() => {
        if ((JSON.parse(localStorage.getItem("userHasLogged"))?.token) && (!user.encodedToken)) {
            getLocalData(location)
        }
    }, [])


    return <authContext.Provider value={{ userSignUp,logout, userlogin, user, token: user?.encodedToken }}>
        {children}
    </authContext.Provider>
}

const useAuth = () => useContext(authContext)
export { useAuth, AuthProvider } 