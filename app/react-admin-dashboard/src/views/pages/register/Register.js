import React, { useState } from "react";
import { signup } from "../../../actions";
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
import Modal from "../../../components/Modals";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [is_student, setIsStudent] = useState(true);
  const [is_teacher, setIsTeacher] = useState(false);
  const [show, setShow] = useState(false);
  const userstate = useSelector((state) => state.user);
  let history = useHistory();

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setShow(true);
  };

  const displayModal = () => {
    return (
      <Modal show={show} setShow={setShow} color={"success"} title={"SUCCESS"}>
        Course registered successfully
      </Modal>
    );
  };

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
      last_name: lastname,
    };

    // console.log(user);
    dispatch(signup(user));
    console.log(userstate);
  };

  const setUserType = (type) => {
    console.log(type);
    if (type == "1") {
      setIsStudent(true);
      setIsTeacher(false);
    } else if (type == "2") {
      setIsTeacher(true);
      setIsStudent(false);
    }
  };

  const LoginPage = () => {
    let path = "/login";
    history.push(path);
  };
  return (
    <>
      <div
        className="c-default-layout flex-row align-items-center"
        style={{ position: "relative" }}
      >
        <div style={{ marginTop: 100 }}>
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="9" lg="7" xl="6">
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm onSubmit={registerUser}>
                      <h1 style={{ fontSize: "40px", fontWeight: 700 }}>
                        Register
                      </h1>
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
                      <div style={{ color: "red" }}>
                        {userstate.error ? userstate.error.username : null}
                      </div>

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
                          <div style={{ color: "red" }}>
                            {userstate.error
                              ? userstate.error.first_name
                              : null}
                          </div>
                        </CCol>
                        <CCol xs="6">
                          <CInputGroup className="mb-3">
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
                          <div style={{ color: "red" }}>
                            {userstate.error ? userstate.error.last_name : null}
                          </div>
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
                      <div style={{ color: "red" }}>
                        {userstate.error ? userstate.error.email : null}
                      </div>
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
                      <div style={{ color: "red" }}>
                        {userstate.error ? userstate.error.password1 : null}
                      </div>
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
                      <div style={{ color: "red" }}>
                        {userstate.error ? userstate.error.password2 : null}
                        {userstate.error
                          ? userstate.error.non_field_errors
                          : null}
                      </div>
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

                      <CButton color="primary" type="submit" block>
                        Register
                      </CButton>
                      <CCol className="text-center">
                        <p style={{ fontsize: "30px" }} className="text-muted">
                          Already a user?
                          <CButton
                            color="link"
                            onClick={LoginPage}
                            className="px-0"
                          >
                            {" "}
                            Login
                          </CButton>
                        </p>
                      </CCol>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <svg viewBox="0 0 1440 319" className="curved-svg">
          <path
            fill="#ffe9ec"
            fill-opacity="1"
            d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      {displayModal()}
    </>
  );
};

export default Register;
