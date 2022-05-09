import "./search.css"
export const Search = () => {

    return (

        <div className="search-input-wrapper search-bar">
            <div className="input-search nav-input-width">
                <span className="fas fa-search input-search-icon"></span>
                <input
                    type="search"
                    className="input-search-input"
                    placeholder="Search"
                />
                <span className="fa-solid fa-filters"></span>
            </div>
        </div>
    )
}