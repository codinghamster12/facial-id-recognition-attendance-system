import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../../actions";
import axios from "../../../helpers/axios";
import { useHistory } from "react-router-dom";
import {
  CInputFile,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import FileSaver from 'file-saver';

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.class);
  const [file, setFile] = useState(null);
  const [id, setId] = useState("");
  let history = useHistory();


  useEffect(() => {
    dispatch(getClasses());
  }, []);

  const viewAttendance = (id) => {
    let path = `/faculty/classes/attendance/${id}`;
    history.push(path);

    // const form = new FormData();

    // form.append("class_id", id);
    // const data= {
    //   id
    //   };
    // console.log(form);
    // dispatch(getAttendance(user, id));
  };

  const exportFile = (id) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };

    // axios
    //   .get(
    //     `/classes/download/`,
    //     { headers: headers },
    //     { responseType: 'blob' }
    //   )
    //   .then((response) => {
    //     // const type = response.headers['Content-Type']
    //     // let url = window.URL.createObjectURL(new Blob([response.data]), { type: type, encoding: 'UTF-8' });
    //     // window.open(url);
    //     // let a = document.createElement("a");
    //     // a.href = url;
    //     // a.download = "report.xlsx";
    //     // a.click();
    //     FileDownload(new Blob([response.data]), 'report.xlsx');

    //   });
    

    fetch(`http://127.0.0.1:8000/classes/download/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((data) => {
      return data.blob().then((res) => FileSaver.saveAs(res, 'reports.xlsx'));
    });
  };

  const viewTodayAttendance = (id) => {
    let path = `/faculty/classes/attendance/today/${id}`;
    history.push(path);

    // const token = localStorage.getItem("token");
    // const headers = {
    //   Authorization: `Token ${token}`,
    // };
  
   
    //   // let form_data = new FormData();
    //   // form_data.append("class_id", id);
    //   // form_data.append("files", file);
   
    // axios
    //   .get(`/classes/attendance/today/${id}`, { headers: headers })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));

    // dispatch(getTodayAttendance(id))

  }

  const markAttendance = (id) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
  
    const data= {
    id,token
    };
      // let form_data = new FormData();
      // form_data.append("class_id", id);
      // form_data.append("files", file);
    console.log(data)
    axios
      .post(`/classes/attendance/`,JSON.stringify(data) , { headers: headers })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
     <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader style={{fontSize: '28px', fontWeight: 700}}>
              Registered Classes
              {/* <CButton
                type="button"
                size="lg"
                color="success"
                style={{ float: "right" }}
                onClick={enrollClass}
              > */}
                {/* <CIcon name="cil-scrubber" /> Enroll
              </CButton> */}
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
                  {data.classes.map(({ id,class_section,class_semester, crs_id, prof_id }) => (
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
                      <CDropdown className="m-3 btn-group">
                    <CDropdownToggle  color="primary">Actions</CDropdownToggle>
                    <CDropdownMenu>
                      {/* <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem> */}
                      {/* <CDropdownItem>Mark Attendance */}
                      {/* <span> */}
                      
                      
                      {/* </span>
               
                </CDropdownItem> */}
                      <CDropdownDivider />
                      <CDropdownItem onClick={() => markAttendance(id)}>
                        Mark Attendance
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem onClick={()=>viewTodayAttendance(id)}>View Attendance</CDropdownItem>
                      <CDropdownDivider/>
                      <CDropdownItem onClick={() => viewAttendance(id)}>
                        View Attendance Summary
                      </CDropdownItem>
                      {/* <CDropdownDivider />
                      <CDropdownItem onClick={()=>exportFile(id)}>Export</CDropdownItem> */}
                    </CDropdownMenu>
                  </CDropdown>
                
              
                      </td>
                    </tr>
                  ))}
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
