import React from "react";

export default function Footer(){
    return(
        <>
            <footer className="footer text-center display-6 bg-primary text-light fw-light py-4 w-100 ">
                <div>&copy; {new Date().getFullYear()} Bishir T M</div> 
            </footer>
        </>
    )
}