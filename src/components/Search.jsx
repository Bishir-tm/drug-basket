import React from "react"

// import barcode from '../icons/barcode.svg';
export default function Search() {
    const [searchText, setSearchText] = React.useState({})

    function handleSearch(event) {
        const {value} = event.target

        setSearchText(prevText=>{
            return {...prevText, searchQuery: value}
        })
        
    }
    console.log(searchText)
    
    return (
        <form action="">
            <div className="home-search-box m-5 d-flex border border-3 border-primary rounded-pill">
                <input className="form-control bg-transparent border-0" type="text" onChange={handleSearch} name="searchText" id="" />
                <button className="search-submit-button" type="button"><img src="icons/search.svg" className="icon" alt="search"  /></button>
                <button className="search-barcode-button" type="button"><img src="icons/barcode-outline.svg"    className="icon" alt="scan barcode"  /></button>
            </div>
        </form>
    )
}