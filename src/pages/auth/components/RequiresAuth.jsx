import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../../context/auth-context"

export const RequiresAuth = ({ children }) => {
    const location = useLocation()
    const { token } = useAuth()

    return token ? children : <Navigate to="/signup" state={{ from: location }} replace />
}
