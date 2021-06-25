import React from "react";
import "./Landing.css";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CSelect,
    CLabel,
    CFormGroup,
  } from "@coreui/react";
import bukc from "../../../assets/bukc.jpg";

const Landing = () => {
  return (
    <>
      <div>
      <CContainer style={{paddingTop: '50px'}}>
        <CRow className="justify-content-space-around">
          <CCol md="6" style={{marginTop: '120px'}}>
              <h1 className="heading">Facial Id Recognition Attendance System</h1>
              <br/>
              <CRow>
                      <CCol xs="4">
                        <CButton style={{backgroundColor: '#800020', color: '#fff',letterSpacing: '0.3rem'}} type="submit" className="px-6 py-2" block>
                          Register
                        </CButton>
                      </CCol>
                      </CRow>
                      
                      <br/>
                     
            
                      <CRow>
                      <CCol xs="4">
                        <CButton style={{backgroundColor: '#800020', color: '#fff',letterSpacing: '0.3rem'}} type="submit" className="px-6 py-2" block>
                          Login
                        </CButton>
                      </CCol>
                      </CRow>
              </CCol>
              <CCol md="6">
                 
            <img src={bukc} style={{ width: "150px", height: "200px", borderRadius: '5px', position: 'absolute', bottom: '-10%', right: '30%' }} ></img>
          </CCol>
              </CRow>

              </CContainer>
        <svg viewBox="0 0 1440 319" className="curved-svg">
          <path
            fill="#ffe9ec"
            fill-opacity="1"
            d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        
      </div>
      </>
    
  );
};

export default Landing;
