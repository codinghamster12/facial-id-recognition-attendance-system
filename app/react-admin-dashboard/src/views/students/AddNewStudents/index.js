import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { addStudent, getStudent } from "../../../actions/students";
import { getUser } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../helpers/axios";
import Modal from "../../../components/Modals";
import { useHistory } from "react-router-dom";

const AddNewStudent = () => {
  const [email_id, setEmailId] = useState("");
  const [registration_no, setRegistrationNo] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [studentImages, setStudentImages] = useState([]);
  const [image, setImage] = useState("");
  const [submitted, setsubmitted] = useState("");
  const student = useSelector((state) => state.student);
  const userstate = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  let history = useHistory();

  const [show, setShow] = useState(false);

  const handleClickOpen = () => {
    setShow(true);
  };

  
  const ClassesPage = () => {
    let path = "/student/classes/";
    history.push(path);
  };

  const displayModal = () => {
    return (
      <Modal show={show} setShow={setShow} color={"success"} title={"SUCCESS"} onClick={ClassesPage}>
        Student profile updated successfully
       
      </Modal>
  
    
    );
  };

  useEffect(() => {
   
    const user = localStorage.getItem("user");
    if(Object.keys(userstate.user).length === 0){
      dispatch(getUser(user));

    }
    if(userstate.user.length > 0){
      setFirstName(userstate.user[0].first_name)
      setLastName(userstate.user[0].last_name)
    }
  
   
   
  }, [userstate.user]);

  // useEffect(() => {
   
  //   console.log(student.message)
  //   if(student.message!=null)
  //   {
  //   if(student.message=="Student created successfully"){
  //     handleClickOpen();
  //   }
    
  // }
  
   
   
  // }, [student.message]);

  const submitForm = (e) => {
   
    e.preventDefault();
    console.log("hello world");

   
    const user = localStorage.getItem("user");

    const form = new FormData();

    form.append("email", email_id);
    form.append("registration_no", registration_no);
    form.append("user", user);
    form.append("semester", semester);
    form.append("section", section);
    for (let image of studentImages) {
      form.append(`image_${image.reg_no}`, image);
    

    }

    dispatch(addStudent(form));

    // handleClickOpen()

    
  
    
  };

  const handleStudentImages = (e) => {
    setStudentImages([...studentImages, e.target.files[0]]);
  };

  const addImages = () => {
    setImage("1");
    const token = localStorage.getItem("token");
    // const headers= {
    //     'Authorization': `Token ${token}`
    // }
    // console.log(headers)
    const reg_no = {
      registration_no,
    };
    axios
      .post(`/students/images/`, JSON.stringify(reg_no), {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log('Response', res.data);
      })
      .catch((err) => console.log(err));
    // console.log(JSON.stringify(reg_no))
  };

  

  // {console.log(student.detail[0])}

  return (
    <>
    
      <div>
        <CButton
          type="submit"
          size="md"
          color="secondary"
          onClick={ClassesPage}
          style={{ float: "left" }}
        >
          <CIcon name="cil-arrow-thick-left" />
        </CButton>
      </div>
      <br />
      <div></div>
      <br />      
    <CRow className="justify-content-center">
        <CCol xs="12" lg="10">
       
    <CCard>
      <CCardHeader style={{fontSize: '28px', fontWeight: 700, letterSpacing: '0.2rem'}}>
        COMPLETE YOUR PROFILE
        <CButton
          type="button"
          size="md"
          color="success"
          onClick={addImages}
          style={{ float: "right" , letterSpacing: '0.2rem'}}
        >
          <CIcon name="cil-camera" /> SNAP
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={submitForm}>
          {/* <CFormGroup>
            <CLabel htmlFor="nf-name">First Name</CLabel>
            <CInput
              type="text"
              id="nf-name"
              name="nf-name"
              placeholder="Name"
              autoComplete="name"
              // onChange={(e) => setName(e.target.value)}
            />
          </CFormGroup> */}
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="nf-firstname" style={{fontWeight: 500}}>First Name</CLabel>
                <CInput
                  type="text"
                  id="nf-firstname"
                  name="nf-firstname"
                  value={firstName}
                  placeholder="First Name"
                  autoComplete="first_name"
                  // onChange={(e) => setEmailId(e.target.value)}
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="nf-lastname" style={{fontWeight: 500}}>Last Name</CLabel>
                <CInput
                  type="text"
                  id="nf-lastname"
                  name="nf-lastname"
                  value={lastName}
                  placeholder="Last Name"
                  autoComplete="last_name"
                  // onChange={(e) => setRegistrationNo(e.target.value)}
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="nf-emailid" style={{fontWeight: 500}}>Parent Email Address</CLabel>
                <CInput
                  type="text"
                  id="nf-emailid"
                  name="nf-emailid"
                  placeholder="Parent Email Address"
                  autoComplete="email_id"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </CFormGroup>
              <div style={{ color: "red" }}>
                            {student.error
                              ? student.error.email
                              : null}
                          </div>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="nf-registrationno" style={{fontWeight: 500}}>Registration No</CLabel>
                <CInput
                  type="text"
                  id="nf-registrationno"
                  name="nf-registrationno"
                  placeholder="Registration Number"
                  autoComplete="registration_no"
                  onChange={(e) => setRegistrationNo(e.target.value)}
                />
              </CFormGroup>
              <div style={{ color: "red" }}>
                            {student.error
                              ? student.error.registration_no
                              : null}
                          </div>
            </CCol>
          

          </CFormGroup>


          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="select" style={{fontWeight: 500}}>Select Semester</CLabel>
                <CSelect
                  custom
                  name="select"
                  id="select"
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="0">Please select</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="select" style={{fontWeight: 500}}>Select Section</CLabel>
                <CSelect
                  custom
                  name="select"
                  id="select"
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="0">Please select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </CSelect>
              </CFormGroup>
            </CCol>
          </CFormGroup>

          {/* <CFormGroup row>
            <CCol md="3">
              <CLabel>Add Images</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInputFile
                id="file-multiple-input"
                name="file-multiple-input"
                multiple
                custom
                onChange={handleStudentImages}
              />
              <CLabel htmlFor="file-multiple-input" variant="custom-file">
                {studentImages.length > 0
                  ? studentImages.map((img) => {
                      return (
                        <span style={{ paddingRight: 10 }}>{img.name}</span>
                      );
                    })
                  : "Add files..."}
              </CLabel>
            </CCol>
          </CFormGroup> */}
          <CCardFooter>
            <CButton type="submit" size="md" color="primary" disabled={!image} style={{letterSpacing: '0.2rem'}}>
             SUBMIT
            </CButton>
           
            {/* <CButton type="reset" size="sm" color="danger">
              <CIcon name="cil-ban" /> Reset
            </CButton> */}
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
   
    </CCol>
    </CRow>
    {displayModal()}
    </>
  );
};

export default AddNewStudent;
