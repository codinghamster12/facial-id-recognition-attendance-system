import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CInputFile,
  CModalFooter,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { getStudents, studentUpdate, studentDelete } from "../../../actions/students";
import Modal from "../../../components/Modals";
import { render } from "enzyme/build";

const fields = [
  "Name",
  "Registration_No",
  "Semester",
  "Section",
  "Course_Id",
  "edit",
  "delete",
];

export default function AllStudents() {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student);
  const [primary, setPrimary] = useState(false);
  const [danger, setDanger] = useState(false);
  const [Name, setName] = useState("");
  const [Enrollment_No, setEnrollmentNo] = useState("");
  const [Registration_No, setRegistrationNo] = useState("");
  const [Semester, setSemester] = useState("");
  const [Section, setSection] = useState("");
  const [Course_Name, setCourseName] = useState("");
  const [Course_Id, setCourseId] = useState("");
  const [studentImages, setStudentImages] = useState([]);
  const [studentDetails, setStudentDetails]= useState({})


  const handleStudentImages = (e) => {
    setStudentImages([...studentImages, e.target.files[0]]);
  };

 

  const showEditModal = (student) => {
    setPrimary(!primary);
    setStudentDetails(student)
    setName(student.Name)
    setEnrollmentNo(student.Enrollment_No)
    setRegistrationNo(student.Registration_No)
    setSemester(student.Semester)
    setSection(student.Section)
    setCourseName(student.Course_Name)
    setCourseId(student.Course_Id)
    let images=[]
    student.images.map(img => {
      images.push({'name': img.image.split('/')[6]})
    })
    console.log(images)
    setStudentImages(images)

  
  };

  const showDeleteModal= (student) => {
    setDanger(!danger)
    setStudentDetails(student)
  }

  

  const updateStudent = (id) => {
    console.log(id);
    setPrimary(!primary);
    const form = new FormData();
    form.append("Name", Name);
    form.append("Enrollment_No", Enrollment_No);
    form.append("Registration_No", Registration_No);
    form.append("Semester", Semester);
    form.append("Section", Section);
    form.append("Course_Name", Course_Name);
    form.append("Course_Id", Course_Id);
    // console.log(studentImages)

    // for (let image of studentImages){

 
    //   form.append(`image_${image.name}`, image)
    // }
    

    

    
    dispatch(studentUpdate(id, form));
  };

  const deleteStudent =(id) => {
    setDanger(!danger)
    dispatch(studentDelete(id))

  }

  const renderDeleteModal = () => {
    if(!danger){
      return null
    }
    else{
      return(
        <Modal
            show={danger}
            setShow={setDanger}
            title={"Delete Student"}
            color={'danger'}
            
          >
            <h5>Are you sure you want to delete?</h5>
          <CModalFooter>
              <CButton
                color="danger"
                onClick={() => deleteStudent(studentDetails.id)}
              >
                Delete
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setDanger(!danger)}>
                Cancel
              </CButton>
            </CModalFooter>
            </Modal>

      )
      
    }
  }

  const renderEditModal = () => {
    if (!primary) {
      return null;
    } else {
      
      return (
        <>
          <Modal
            show={primary}
            setShow={setPrimary}
            title={"Update Student"}
            color={"primary"}
          >
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel htmlFor="nf-name">Name</CLabel>
                <CInput
                value={Name}
                  type="text"
                  id="nf-name"
                  name="nf-name"
                  placeholder="Name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="nf-enrollmentno">Enrollment No</CLabel>
                    <CInput
                      value={Enrollment_No}
                      type="text"
                      id="nf-enrollmentno"
                      name="nf-enrollmentno"
                      placeholder="Enrollment Number"
                      autoComplete="enrollment_no"
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="nf-registrationno">Registration No</CLabel>
                    <CInput
                    value={Registration_No}
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
                      value={Semester}
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
                      value={Section}
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

              <CFormGroup row className="my-0">
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="select">Select Course Name</CLabel>
                    <CSelect
                      value={Course_Name}
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setCourseName(e.target.value)}
                    >
                      <option value="0">Please select</option>
                      <option value="DCN">DCN</option>
                      <option value="OOP">OOP</option>
                      <option value="DBMS">DBMS</option>
                      <option value="DSA">DSA</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="select">Select Course Id</CLabel>
                    <CSelect
                      value={Course_Id}
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setCourseId(e.target.value)}
                    >
                      <option value="0">Please select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
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
              </CFormGroup>
            </CForm>
            <CModalFooter>
              <CButton
                color="primary"
                onClick={() => updateStudent(studentDetails.id)}
              >
                Update
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setPrimary(!primary)}>
                Cancel
              </CButton>
            </CModalFooter>
          </Modal>
        </>
      );
    }
  };

  useEffect(() => {
    dispatch(getStudents());
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Combined All Table</CCardHeader>
            <CCardBody>
              <CDataTable
                items={student.students}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  edit: (item, index) => {
                    return (
                      <td>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            showEditModal(item);
                          }}
                        >
                          Edit
                        </CButton>
                        {renderEditModal()}
                      </td>
                    );
                  },
                  delete: (item, index) => {
                    return (
                      <td>
                        <CButton
                          color="danger"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            showDeleteModal(item)
                          }}
                        >
                          Delete
                        </CButton>
                        {renderDeleteModal()}
                      
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
