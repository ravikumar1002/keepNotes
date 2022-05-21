import errorImg from "../../assets/error-img.png"
import { Link } from "react-router-dom"
import "./error-page.css"

export const ErrorPage = () => {

    return (
        <div className="text-center mt-4">
            <div className="text-center mt-4">
                <div>
                    <img src={errorImg} alt="404 page not found" className="error-img" />
                </div>

                <div>
                    <h2 className="error-heading">404 - PAGE NOT FOUND</h2>
                    <div className="error-content">
                        <p>This page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
                    </div>
                    <Link to="/" className="error-page-btn btn-sm btn-primary border-squre">
                        GO TO HOMEPAGE
                    </Link>
                </div>
            </div>
        </div>
    )
}
