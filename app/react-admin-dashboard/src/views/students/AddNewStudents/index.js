import React, { useState } from "react";
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
import { addStudent } from "../../../actions/students";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../../helpers/axios';


const AddNewStudent = () => {
  const [Name, setName] = useState("");
  const [email_id, setEmailId] = useState("");
  const [registration_no, setRegistrationNo] = useState("");
  const [Semester, setSemester] = useState("");
  const [Section, setSection] = useState("");
  const [Course_Name, setCourseName] = useState("");
  const [Course_Id, setCourseId] = useState("");
  const [studentImages, setStudentImages] = useState([]);
  const student = useSelector((state) => state.student);

  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    console.log();
    // console.log(Name.value.match('/^[-+]?[0-9]+$/'))

    // if (Name === "") {
    //   alert("Name is required");
    // } else if (!/^[a-zA-Z ]*$/.test(Name)) {
    //   alert("Please enter a correct Name.");
    // } else if (Enrollment_No === "") {
    //   alert("Enrollment No is required");
    // } else if (!/^[0-9]+(-[0-9]+)+$/.test(Enrollment_No)) {
    //   alert("Please enter a correct enrollment number");
    // } else if (registration_no === "") {
    //   alert("Registration No is required");
    // } else if (!/^[0-9]+$/.test(registration_no)) {
    //   alert("Please enter a correct registration number.");
    // } else if (Semester === "") {
    //   alert("Semester is required");
    // } else if (Section === "") {
    //   alert("Section is required");
    // } else if (Course_Name === "") {
    //   alert("Course Name is required");
    // } else if (Course_Id === "") {
    //   alert("Course Id is required");
    // }
    const user= localStorage.getItem('user')
    
    const form = new FormData();
    // form.append("Name", Name);
    // form.append("Enrollment_No", Enrollment_No);
    form.append("email",email_id)
    form.append("registration_no", registration_no);
    form.append("user", user);
    
    // form.append("Semester", Semester);
    // form.append("Section", Section);
    // form.append("Course_Name", Course_Name);
    // form.append("Course_Id", Course_Id);

    for (let image of studentImages) {
      form.append(`image_${image.reg_no}`, image);
    }

    // console.log(images)
    // const student={
    //   Name,
    //   Enrollment_No,
    //   Registration_No,
    //   Semester,
    //   Section,
    //   Course_Name,
    //   Course_Id,
    //   images

    // }

    dispatch(addStudent(form));
    console.log(student);
    
  };

  const handleStudentImages = (e) => {
    setStudentImages([...studentImages, e.target.files[0]]);
  };

  const addImages = () => {
    const token= localStorage.getItem('token')
    // const headers= {
    //     'Authorization': `Token ${token}`
    // }
    // console.log(headers)
    const reg_no= {
      registration_no
    }
    axios
    .post(`/students/images/`,JSON.stringify(reg_no),{headers: { 'Authorization': `Token ${token}`}},)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
    // console.log(JSON.stringify(reg_no))
  };

  return (
    <CCard>
      <CCardHeader style={{fontSize: '26px', fontWeight: '700'}}>Complete your Profile
      <CButton
              type="button"
              size="md"
              color="success"
              onClick={addImages}
              style={{float: 'right'}}
            >
              <CIcon name="cil-scrubber" /> Take Images
            </CButton></CCardHeader>
      <CCardBody>
        <CForm action="" method="post" onSubmit={submitForm}>
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
                <CLabel htmlFor="nf-firstname">First Name</CLabel>
                <CInput
                  type="text"
                  id="nf-firstname"
                  name="nf-firstname"
                  placeholder="First Name"
                  autoComplete="first_name"
                  // onChange={(e) => setEmailId(e.target.value)}
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="nf-lastname">Last Name</CLabel>
                <CInput
                  type="text"
                  id="nf-lastname"
                  name="nf-lastname"
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
                <CLabel htmlFor="nf-emailid">Parent Email Address</CLabel>
                <CInput
                  type="text"
                  id="nf-emailid"
                  name="nf-emailid"
                  placeholder="Parent Email Address"
                  autoComplete="email_id"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="nf-registrationno">Registration No</CLabel>
                <CInput
                  type="text"
                  id="nf-registrationno"
                  name="nf-registrationno"
                  placeholder="Registration Number"
                  autoComplete="registration_no"
                  onChange={(e) => setRegistrationNo(e.target.value)}
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>

          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="select">Select Semester</CLabel>
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
                <CLabel htmlFor="select">Select Section</CLabel>
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
            
      
            
            <CButton type="submit" size="md" color="primary">
              <CIcon name="cil-scrubber" /> Submit
            </CButton>{" "}
            {/* <CButton type="reset" size="sm" color="danger">
              <CIcon name="cil-ban" /> Reset
            </CButton> */}
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AddNewStudent;
