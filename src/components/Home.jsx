import React, { useEffect, useState } from 'react';
import SkeletonLoader from './SkeletonLoader';
import axios from 'axios'
import swal from 'sweetalert2'

const Home = () => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  // ************* This part is for safety alert: ***************** 
  useEffect(() => {
    if (drugInfo) {
      // Check if the properties exist before accessing index 0
      const warnings = drugInfo.warnings && drugInfo.warnings[0] ? drugInfo.warnings[0] : '';
      const boxed_warning = drugInfo.boxed_warning && drugInfo.boxed_warning[0] ? drugInfo.boxed_warning[0] : '';
      const warnings_and_cautions = drugInfo.warnings_and_cautions && drugInfo.warnings_and_cautions[0] ? drugInfo.warnings_and_cautions[0] : '';
  
      const safetyAlerts = `
      <div class="accordion text-start " id="warningsAccordion" >
        <!-- Warnings -->
        <div class="accordion-item bg-danger text-white">
          <h2 class="accordion-header" id="warningsHeading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#warningsCollapse" aria-expanded="true" aria-controls="warningsCollapse">
              Warnings
            </button>
          </h2>
          <div id="warningsCollapse" class="accordion-collapse collapse show" aria-labelledby="warningsHeading">
            <div class="accordion-body">
              ${warnings}
            </div>
          </div>
        </div>
    
        <!-- Box Warnings -->
        <div class="accordion-item bg-danger text-white">
          <h2 class="accordion-header" id="boxWarningsHeading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#boxWarningsCollapse" aria-expanded="true" aria-controls="boxWarningsCollapse">
              Box Warnings
            </button>
          </h2>
          <div id="boxWarningsCollapse" class="accordion-collapse collapse show" aria-labelledby="boxWarningsHeading">
            <div class="accordion-body">
              ${boxed_warning}
            </div>
          </div>
        </div>
    
        <!-- Warnings & Cautions -->
        <div class="accordion-item bg-danger text-white">
          <h2 class="accordion-header" id="warningsCautionsHeading">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#warningsCautionsCollapse" aria-expanded="true" aria-controls="warningsCautionsCollapse">
              Warnings & Cautions
            </button>
          </h2>
          <div id="warningsCautionsCollapse" class="accordion-collapse collapse show" aria-labelledby="warningsCautionsHeading">
            <div class="accordion-body">
              ${warnings_and_cautions}
            </div>
          </div>
        </div>
      </div>
    `;
    
    swal.fire({
      title: '<h1 class="text-danger">Safety Alerts</h1>',
      html: safetyAlerts,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
    }
  }, [drugInfo]);
  // ******************* End of safety Alert *****************


  let apiUrl = "";
  const handleSearch = () => {
    if (drugName === 'paracitamol' || drugName === 'panadol') {
      setDrugName('acetaminophen')
    } else if (drugName === "") {
      swal.fire('Invalid Input','You need to type something into the search box first', 'warning')
    }
    apiUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${
    drugName
    }+OR+openfda.generic_name:${
      drugName
    }+OR+openfda.substance_name:${
      drugName
    }&limit=1`
    setIsLoading(true)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setDrugInfo(prevState => {
            console.log(prevState);
            return data.results[0];
          });
          
          
        } else {
          if (drugName !== '') {
            swal.fire('Sorry !', '<h3>No data Found for "' + drugName + '"!<br/> Check Your Spelling and try again</h3>', 'info')
          }
          setDrugInfo(null);
        }
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.message === '404 (Not Found)') {
          swal.fire('Network error. Please check your internet connection.')
        }
        console.error('Error fetching data:'  +  error.message);
        setDrugInfo(null);
        setIsLoading(false)
      });
    };
    
    
  return (
    <div className="container mt-5 vh-100">
      <div className=''>
        <div className=" home-search-box m-5 d-flex border border-3 border-primary rounded-pill">
          <input
            required
            type="search"
            placeholder="type drug name here ..."
            className="py-3 w-100 form-control 2 border-0"
            id="drugName"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
          />
          <button  className="search-submit-butto  mx-3 btn btn-outline-primary border-0 fs-3"  onClick={handleSearch}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="text-danger"><path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"></path><path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"></path></svg>          </button>
        </div>
      </div>
      {isLoading ? (<SkeletonLoader />) : 
      ( drugInfo ? (
        <div className="card m-lg-4 p-lg-5 text-">
            <div className="card-header bg-white m-3 my-lg-5 p-lg-3 rounded rounded-4'">
                  <h1 className="text-center text-primary border-primary py-3">{drugInfo.openfda.brand_name} <span className="text-danger">|</span> {drugInfo.openfda.generic_name}</h1>
            </div>
            <div className="card-body">
                { drugInfo.description && (
                  <div className=' border my-5 shadow p-3 p-lg-5 rounded rounded-4'>
                    <h2  className="h1 border-bottom border-primary py-3">Description</h2>
                    <p>{drugInfo.description} </p>
                  </div>
                )}

                {(drugInfo.warnings || drugInfo.boxed_warning || drugInfo.warnings_and_cautions) && (
                  <div  className="accordion border-start border-danger border-5 accordion-flush m-3 my-5 shadow p-lg-5 rounded rounded-4" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item alert alert-danger">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                      <button className="text-danger  h2 fs-2 accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                      Warning
                      </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                        {drugInfo.warnings && <strong><p>{drugInfo.warnings}</p></strong>} {drugInfo.boxed_warning && <strong><p>{drugInfo.boxed_warning}</p></strong>} {drugInfo.warnings_and_cautions && <strong><p>{drugInfo.warnings_and_cautions[0]}</p></strong>}
                        </div>
                      </div>
                    </div>
                  </div> 
                )}

                {console.log(drugInfo)}

                { drugInfo.indications_and_usage && (
                  <div className=' border border-primary p-3 border-1 my-5 shadow p-lg-5 rounded rounded-4'>
                    <h2 id="indications_and_usage" className="h1 border-bottom border-primary py-3">Indications and Usage</h2>
                    <p>{drugInfo.indications_and_usage}</p>
                  </div>
                )}
              
                { drugInfo.active_ingredient && (
                  <div className=' border border-primary p-3 border-1 my-5 shadow p-lg-5 rounded rounded-4'>
                    <h2 id="active_ingredient" className="h1 border-bottom border-primary py-3">Active Ingredient</h2>
                    <p>{drugInfo.active_ingredient}</p>
                  </div>
                )}

                {drugInfo.dosage_and_administration && (
                  <div className=' border border-primary p-3 border-1 my-5 shadow p-lg-5 rounded rounded-4'>
                    <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">Dosage and Administration</h2>
                    <p>{drugInfo.dosage_and_administration}</p>
                  </div>
                )}
                  {drugInfo.overdosage && (
                    <div className=' border border-primary p-3 border-1 my-5 shadow p-lg-5 rounded rounded-4'>
                      <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">Overdose Warning</h2>
                      <p>{drugInfo.overdosage}</p>
                    </div>
                  )}
                
                  {drugInfo.contraindications && (
                    <div className=' border border-primary p-3 border-1 my-5 shadow p-lg-5 rounded rounded-4'>
                      <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">Contraindications And Precautions</h2>
                      <p>{drugInfo.contraindications}</p>
                    </div>
                  )}
                  
                  {drugInfo.general_precautions && (
                    <div className=' border border-primary p-3 border-1 my-5 shadow p-lg-5 rounded rounded-4'>
                      <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">General Precautions</h2>
                      <p>{drugInfo.general_precautions}</p>
                    </div>
                  )}

              {/* <h5 className="card-title">{drugInfo.openfda.brand_name}</h5>
              <p className="card-text">Generic Name: {drugInfo.openfda.generic_name}</p>
              <p className="card-text">Substance Name: {drugInfo.openfda.substance_name}</p>
              // Add more drug info fields as needed
              */}
            </div>
          </div>
        ): (
          <main>
            <h1 className="fs-1 text-dark fw-bolder text-center display-1 my-4">Features</h1>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
              
              <div className="col " style={{minHeight: "170px !important", maxHeight:"180px !important"}}>
                <div className="card border border-4 border-primarymb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h1 className="card-title pricing-card-title border-primary">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" className="text-danger" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>  
                    </h1>
                  </div>
                  <div className="card-body">
                    <p className="w-100 fw-bold">
                      Search over 4,000 approved drugs from the FDA 
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col " style={{minHeight: "170px !important", maxHeight:"180px !important"}}>
                <div className="card border border-4 border-primarymb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h1 className="card-title pricing-card-title border-primary">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg" className="text-danger " ><path d="M383.72 70.188c-1.145-.01-2.293 0-3.44.03-16.662.428-33.436 4.925-48.81 13.907-148.594 86.803-101.707 58.72-253.533 146.375l-4.656 2.688v.312c-45.61 29.694-60.683 90.445-33.155 138.125 28.464 49.3 91.974 66.493 141.188 37.78 151.39-88.32 104.363-60.41 253.5-146.374 49.327-28.43 66.307-91.824 37.843-141.124-18.957-32.834-53.47-51.442-88.937-51.72zm1.342 16.468c25.255.406 49.682 13.512 63.094 36.844 1.82 3.164 2.786 6.918 4.094 10.22-22.875-25.86-61.86-33.04-92.97-15-64.527 37.42-83.64 48.864-105.686 61.874 22.46 19.385 44.32 52.128 54.25 82.03-56.72 32.796-51.65 30.67-148.844 87.032-31.11 18.04-70.094 10.858-92.97-15 1.31 3.3 2.277 7.055 4.095 10.22 20.438 35.552 66.447 47.306 102 26.687 93.043-53.956 91.828-53.805 141.188-82.313.507 9.606-1.02 18.18-5.094 24.938-28.792 16.492-53.304 30.647-136.345 79.093-40.39 23.566-92.154 9.545-115.563-31-23.408-40.542-9.574-92.186 30.97-115.592l4.687-2.72c73.185-42.234 98.623-56.668 125.81-72.25 37.072-21.5 44.154-26.065 128.376-74.905 12.222-7.088 25.678-10.37 38.906-10.157z"></path></svg>            
                    </h1>
                  </div>
                  <div className="card-body">
                    <p className="w-100 fw-bold">
                      Get Instant Safety Alert for any Known Drug 
                    </p>
                  </div>
                </div>
              </div>
              <div className="col " style={{minHeight: "170px !important", maxHeight:"180px !important"}}>
                <div className="card border border-4 border-primarymb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h1 className="card-title pricing-card-title border-primary">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="3em" className="text-danger"  width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>            </h1>
                  </div>
                  <div className="card-body">
                    <p className="w-100 fw-bold">
                      Get Relevant Information on any Drug 
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </main>
        )
      )}
    </div>
  );
};

export default Home;
