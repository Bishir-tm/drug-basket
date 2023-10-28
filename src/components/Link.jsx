import React from 'react';

export default function Link(props) {
    return(
        <span >
           <a href={"#" + props.item} className="badge rounded-pill bg-primary p-2 m-2 text-decoration-none">{props.itemText}</a>
        </span>
    )
  }