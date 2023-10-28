import React from "react";

export default function Error(props){
    return (
        <div className="w-50  alert  col-lg-2  alert-danger alert-dismissible fade show" role="alert">
            <p>{props.message}</p>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    )
}

 