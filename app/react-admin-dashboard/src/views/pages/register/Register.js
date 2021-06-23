import React, { useState } from "react";
import { signup } from '../../../actions';
import { useHistory } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import CIcon from "@coreui/icons-react";
import Modal from '../../../components/Modals';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [is_student, setIsStudent] = useState(true);
  const [is_teacher, setIsTeacher] = useState(false);
  const [show, setShow]= useState(false);
  const userstate = useSelector((state) => state.user);
  let history = useHistory();

  
 

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setShow(true)
  }

  const displayModal = () => {
    return(
      <Modal show={show} setShow={setShow} color={"success"} title={"SUCCESS"}>Course registered successfully</Modal>

    )

  }

  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
      is_student: is_student,
      is_teacher: is_teacher,
      first_name: firstname,
      last_name: lastname
    };

    // console.log(user);
    dispatch(signup(user));
    console.log(userstate);
    
    
  };

  

  const setUserType = (type) => {
    console.log(type)
    if(type== '1') {
      setIsStudent(true)
      setIsTeacher(false)
    }
    else if(type== '2'){
      setIsTeacher(true)
      setIsStudent(false)
    }

  }

  const LoginPage = () => {
  
    let path = "/login";
    history.push(path);
  };
  return (
    <>
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={registerUser}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CFormGroup row className="my-0">
                    <CCol xs="6">
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Firstname"
                      autoComplete="firstname"
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </CInputGroup>
                  </CCol>
                 <CCol xs="6">
                  <CInputGroup className="mb-3" >
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Lastname"
                      autoComplete="lastname"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </CInputGroup>
                  </CCol>
                  </CFormGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword1(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(e) => setUserType(e.target.value)}
                    >

                      <option value="1">Student</option>
                      <option value="2">Faculty</option>
                    </CSelect>
                  </CInputGroup>

                  <CButton color="success" type="submit" block>
                    Register
                  </CButton>
                  <CCol className="text-center">
                  <p style={{fontsize:"30px"}}className="text-muted">Already a user?
                  <CButton color="link"  onClick={LoginPage} className="px-0"> Login</CButton>
                  </p>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
     {displayModal()}
     </>
  );
};

export default Register;
