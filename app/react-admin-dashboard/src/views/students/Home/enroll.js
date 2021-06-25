
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnRegisteredClasses } from "../../../actions";
import { getClasses } from "../../../actions";
import axios from "../../../helpers/axios";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import Modal from '../../../components/Modals';

const Enroll = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.class);
    const [show, setShow]= useState(false);
    // const [id, setId] = useState("");

   
  
    useEffect(() => {
      dispatch(getUnRegisteredClasses());
      console.log(data)
    }, []);

    const handleClickOpen = () => {
      setShow(true)
    }

    const displayModal = () => {
      return(
        <Modal show={show} setShow={setShow} color={"success"} title={"SUCCESS"}>Course registered successfully</Modal>

      )

    }

    const enrollStudent = (e) => {
    
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
   
      const headers = {
        Authorization: `Token ${token}`,
      };
  
      let form_data = new FormData();
      form_data.append("student_id", user);
      form_data.append("class_id", e.target.id);
  
      axios
        .post(`/classes/enroll/enroll-student/`, form_data, { headers: headers })
        .then((res) => {
          // console.log(res.data);
          // console.log(res)
          if(res.status == 201){
            handleClickOpen();
          }
          
         
        })
        .catch((err) => console.log(err));
  
     
    };
  
   
    return (
    
       <>
      <CRow className="justify-content-center">
        <CCol xs="12" lg="10">
          <CCard>
            <CCardHeader style={{fontSize: '28px', fontWeight: 700, letterSpacing: '0.2rem'}}>
              Register Courses
              
            </CCardHeader>

            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead style={{letterSpacing: '0.2rem', fontSize: '16px', fontWeight: 100}} className="thead-light">
                  <tr color="gradient-primary">
                    <th>TITLE</th>
                    <th>CREDIT HOURS</th>
                    <th>CLASS</th>
                    <th>PROFESSOR</th>
                    <th>ACTIVITY</th>
                  </tr>
                </thead>

                <tbody>
                  {data.classes.map(({ id,class_semester,class_section, crs_id, prof_id }) => (
                    <tr key={id}>
                      <td>
                        <div>{crs_id.crs_title}</div>
                      </td>
                      <td>
                        <div>{crs_id.crs_credit}</div>
                      </td>
                      <td>
                        <div>{`BSE[4]-${class_semester} (${class_section}) Morning`}</div>
                      </td>
                      <td>
                        <div>{`${prof_id.first_name} ${prof_id.last_name}`}</div>
                      </td>
                      <td>
                        <CButton id={id} type="button" size="lg" color="success" onClick={(e) => enrollStudent(e)}>
                          <CIcon name="cil-scrubber" /> Register
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {displayModal()}
    </>
       
    )
}

export default Enroll
