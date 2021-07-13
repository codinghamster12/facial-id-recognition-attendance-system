import { attendanceConstants } from "./constants";
import axios from "../helpers/axios";

export const getAttendance = (id, class_id) => {
  return async (dispatch) => {
    dispatch({
      type: attendanceConstants.STUDENT_ATTENDANCE_REQUEST,
    });
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    // data= JSON.parse(data)
    let config = {
      headers: { Authorization: `Token ${token}` },
      params: {
        class_id: class_id,
      },
    };
    // console.log(data)
    try {
      const res = await axios.get(`/classes/view-attendance/${id}/`, config);

      if (res.status == 200) {
        console.log(res.data);
        dispatch({
          type: attendanceConstants.STUDENT_ATTENDANCE_SUCCESS,
          payload: {
            attendance: res.data,
          },
        });
      }
    } catch (error) {
      // if(error.response.status == 400){
      //     dispatch({
      //         type: studentConstants.GET_STUDENTS_FAILURE,
      //         payload:{
      //             error: error.response.data
      //         }
      //     })
      // }
      console.log(error);
    }
  };
};

export const getClassAttendance = (class_id) => {
  return async (dispatch) => {
    dispatch({
      type: attendanceConstants.CLASS_ATTENDANCE_REQUEST,
    });
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    // data= JSON.parse(data)
    let config = {
      headers: { Authorization: `Token ${token}` },
    };
    // console.log(data)
    try {
      const res = await axios.get(
        `/classes/view-classattendance/${class_id}/`,
        config
      );

      if (res.status == 200) {
        console.log(res.data);
        dispatch({
          type: attendanceConstants.CLASS_ATTENDANCE_SUCCESS,
          payload: {
            attendance: res.data,
          },
        });
      }
    } catch (error) {
      // if(error.response.status == 400){
      //     dispatch({
      //         type: studentConstants.GET_STUDENTS_FAILURE,
      //         payload:{
      //             error: error.response.data
      //         }
      //     })
      // }
      console.log(error);
    }
  };
};

export const getTodayAttendance = (class_id) => {
  return async (dispatch) => {
    dispatch({
      type: attendanceConstants.TODAY_ATTENDANCE_REQUEST,
    });
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    // data= JSON.parse(data)
    let config = {
      headers: { Authorization: `Token ${token}` },
    };
    // console.log(data)
    try {
      const res = await axios.get(
        `/classes/attendance/today/${class_id}/`,
        config
      );

      if (res.status == 200) {
        console.log(res.data);
        dispatch({
          type: attendanceConstants.TODAY_ATTENDANCE_SUCCESS,
          payload: {
            today: res.data,
          },
        });
      }
    } catch (error) {
      // if(error.response.status == 400){
      //     dispatch({
      //         type: studentConstants.GET_STUDENTS_FAILURE,
      //         payload:{
      //             error: error.response.data
      //         }
      //     })
      // }
      console.log(error);
    }
  };
};
