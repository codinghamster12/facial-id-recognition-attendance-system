import React, { useState, useEffect } from "react";
import {
  getStudent,
  isUserLoggedIn,
  login,
  getClasses,
} from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import facial from "../../../assets/facial.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const auth = useSelector((state) => state.auth);
  const student = useSelector((state) => state.student);

  setTimeout(() => {
    
    if (auth.authenticate) {
    
      if (auth.user.user_type.is_student == true) {
        if (student.detail && student.detail.length > 0) {
         history.push('/student/classes')
        } else {
        
          history.push('/student/profile')
        }
      } else {
       
        history.push('/faculty/classes')
      }
    }
  }, 2000);

  useEffect(() => {
   
   
  
    setLoading(false);
  
  
   
   
  }, [auth.error]);

  


  // if (auth.authenticate) {

  //   if (auth.user.user_type.is_student == true) {

  //     console.log(classes)
  //     if (classes.classes.length > 0) {
  //       return <Redirect to={"/student/classes"}></Redirect>;
  //     } else {
  //       return <Redirect to={"/student/profile"}></Redirect>;
  //     }
  //   } else {
  //     return <Redirect to={"/faculty/classes"}></Redirect>;
  //   }
  // }

  const RegisterPage = () => {
    let path = "/register";
    history.push(path);
  };

  const userLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(login(user));
    
    // if(!student.detail){
    //   const id = auth.user.user;
    //   dispatch(getStudent(id));
    // }

    // if(student.detail.length == 0){
    //   const id= auth.user.user
    //   console.log(id)
    //   dispatch(getStudent(id));
    // }
  };

 

  return (
    <div style={{ marginTop: "120px" }} className="parent">
      <CContainer style={{ paddingTop: "50px" }}>
        <CRow className="justify-content-center no-gutters">
          <CCol md="4">
            <img
              src={facial}
              style={{
                width: "100%",
                height: "100%",
                opacity: 0.7,
                borderRadius: "5px",
              }}
            ></img>
          </CCol>
          <CCol md="6">
            <CCardGroup style={{ width: "100%", height: "100%" }}>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={userLogin}>
                    <h1 style={{ fontSize: "40px", fontWeight: 700 }}>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
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
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="4">
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="8" className="text-right">
                        <p style={{ fontsize: "30px" }} className="text-muted">
                          Haven't registered yet?
                        </p>
                        <CButton
                          color="link"
                          onClick={RegisterPage}
                          className="px-0"
                        >
                          Register
                        </CButton>
                      </CCol>
                    </CRow>
                    {loading?null:(<div style={{ color: "red" }}>
                    {auth.error ? Object.values(auth.error)[0] : null}
                    </div>)}
                    
                  </CForm>
                  {loading?( <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>):null}
                 
                </CCardBody>
              </CCard>
            </CCardGroup>
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
  );
};

export default Login;
