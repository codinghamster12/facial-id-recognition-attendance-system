import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses, getAttendance } from "../../../actions";
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
import { freeSet } from '@coreui/icons'
import CIcon from "@coreui/icons-react";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.class);

  let history = useHistory();
  const user = localStorage.getItem("user");

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  const enrollClass = () => {
    let path = "/student/classes/enroll/";
    history.push(path);
  };
  const viewAttendance = (id) => {
    let path = `/student/classes/attendance/${id}`;
    history.push(path);

    // const form = new FormData();

    // form.append("class_id", id);
    // const data= {
    //   id
    //   };
    // console.log(form);
    // dispatch(getAttendance(user, id));
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader style={{fontSize: '28px', fontWeight: 700}}>
              Registered Classes
              <br/>
              <CButton
                type="button"
                size="sm"
                color="dark"
                onClick={enrollClass}
              >
                <CIcon name="cil-plus"/> Enroll
              </CButton>
            </CCardHeader>

            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr color="gradient-primary">
                    <th>Course Title</th>
                    <th>Credit Hours</th>
                    <th>Class</th>
                    <th>Professor Name</th>
                    <th>Activity</th>
                  </tr>
                </thead>

                <tbody>
                  {data.classes.map(
                    ({
                      id,
                      class_semester,
                      class_section,
                      crs_id,
                      prof_id,
                    }) => (
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
                          <CButton
                            type="button"
                            onClick={() => viewAttendance(id)}
                            size="sm"
                            color="primary"
                          >
                            <CIcon content={freeSet.cilEye} /> View Attendance
                          </CButton>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
