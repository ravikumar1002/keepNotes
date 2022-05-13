import { Link } from "react-router-dom"
import "./header.css"
export const Header = () => {

    return (
        <div>
            <header className=" p-2  nav-wrapper">
            <div >
                <h2>
                    <Link to="/" className=" text-decoration-none">
                        Keep Notes
                    </Link>
                </h2>
            </div>
        </header>
        </div>
    )
}