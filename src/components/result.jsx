import React from "react";
import exampleQuery from "../exampleQuery";

function removeWords(inputString, number) {
    // Split the string into an array of words
    const wordsArray = inputString.split(' ');
  
    // Remove the first two elements from the array
    wordsArray.splice(0, number);
  
    // Join the remaining words back into a string
    const resultString = wordsArray.join(' ');
    
    return resultString;
}

function Link(props) {
    return(
        <span >
           <a href={"#" + props.item} className="badge rounded-pill bg-primary p-2 m-2 text-decoration-none">{props.itemText}</a>
        </span>
    )
}

const items = [
    "warnings",
    "dosage_and_administration",
    "description",
    "overdosage",
    "indications_and_usage",
    "contraindications",
    "boxed_warning",
    "precautions",
    "information_for_patients",
    "drug_interactions",
    "pregnancy",
    "nursing_mothers",
    "how_supplied",
    "storage_and_handling",
]

const links = items.map((item)=>{
        return (
            <Link item = {item} itemText = {item.replace(/_/g, " ")} />
        )} 
)

function Result(props){
    console.log(props.data)
    
    

     return (
        <div className="container mt-4">
            <div>{links}</div>
            <div className="card">
                <div className="card-header bg-white">
                    <h1 className="display-1  text-center border-bottom py-3">{props.data.openfda.brand_name} <span className="text-danger">|</span> {props.data.openfda.generic_name}</h1>
                </div>
                <div className="card-body">

                    {/* Description */}
                    <div>
                        <h2 id="description" className="h1 border-bottom py-3">Description</h2>
                        <p>{props.description[0]}</p>
                    </div>
                   
                    {/* Warning */}
                    <div  className="accordion border-start border-danger border-5 accordion-flush " id="accordionPanelsStayOpenExample">
                        <div className="accordion-item alert alert-danger">
                            <h2 id="boxed_warning" className="accordion-header" id="panelsStayOpen-headingOne">
                                <button className="text-danger  h2 fs-2 accordion-button bg-white" type="button" props-bs-toggle="collapse" props-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    Warning
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                <div className="accordion-body">
                                    <strong>{removeWords(props.boxed_warning[0],0)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Indications and Usage */}
                    <div>
                        <h2 id="indications_and_usage" className="h1 border-bottom py-3">Indications and Usage</h2>
                        <p>{props.indications_and_usage[0]}</p>
                    </div>

                    {/* Dosage and Administration */}
                    <div>
                        <h2 id="dosage_and_administration" className="h1 border-bottom py-3">Dosage and Administration</h2>
                        <p>{props.dosage_and_administration[0]}</p>
                    </div>
                   
                    {/* Dosage and Administration */}
                    <div>
                        <h2 id="dosageAndAdministration" className="h1 border-bottom py-3">Dosage and Administration</h2>
                        <p>{props.dosage_and_administration[0]}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}