import axios from "../helpers/axios";
import { authConstants, studentConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    try {
      const res = await axios.post(`/rest-auth/login/`, {
        ...user,
      });

      if (res.status == 200) {

        const { key, user } = res.data;
        const person= res.data;
        localStorage.setItem("token", key);
        localStorage.setItem("user", user);
        localStorage.setItem("person", JSON.stringify(person));

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            user: res.data,
            person
          },
        });
      }
      return res.data;
    } catch (error) {
      if (error.response.status == 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: error.response.data,
          },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const person= JSON.parse(localStorage.getItem("person"))
    const user= localStorage.getItem("user")

    if (token) {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          person,
          user
        },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    // const token= localStorage.getItem('token')
    // const headers= {
    //     'Authorization': `Token ${token}`
    // }
    try {
      const res = await axios.post(`/rest-auth/logout/`);

      if (res.status == 200) {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGOUT_SUCCESS,
        });
      }
      // else{
      //     if(res.status == 401){
      //         dispatch({
      //             type: authConstants.LOGOUT_SUCCESS,

      //         })

      //     }
      // }
    } catch (error) {
      if (error.response.status == 401) {
        dispatch({
          type: authConstants.LOGOUT_FAILURE,
          payload: {
            error: error.response.data,
          },
        });
      }
    }
  };
};
