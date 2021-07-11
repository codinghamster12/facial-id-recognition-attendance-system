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

        const { key } = res.data;
        const user= res.data;
        localStorage.setItem("token", key);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            user: res.data,
            
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
    const user= JSON.parse(localStorage.getItem("user"))
    if (token) {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
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
