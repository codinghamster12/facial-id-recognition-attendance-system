import React, { Component, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { getClasses, isUserLoggedIn, getStudent } from "./actions";
import PrivateRoute from './views/HOC/PrivateRoute'



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Landing = React.lazy(() => import("./views/pages/Landing/Landing"));


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const student = useSelector((state) => state.student);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      const id= auth.person.user
      dispatch(getClasses())
      dispatch(getStudent(id))

    }
    
    
  }, [auth.authenticate]);

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
        <Route
            exact
            path="/landing"
            name="Landing Page"
            render={(props) => <Landing {...props} />}
          />
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <PrivateRoute

            path="/"

            component={TheLayout}
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
