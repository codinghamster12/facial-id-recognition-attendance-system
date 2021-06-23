import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'

const Modals = (props) => {

 

  return(
    <CModal 
    show={props.show} 
    onClose={() => props.setShow(!props.show)}
    color={props.color}
  >
    <CModalHeader closeButton>
      <CModalTitle>{props.title}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      {props.children}
    </CModalBody>
    
  </CModal>

  )

}

export default Modals
