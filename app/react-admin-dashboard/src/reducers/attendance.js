import { attendanceConstants } from "../actions/constants";

const initState = {
  attendance: [],
  error: null,
  message: null
};

// const performUpdate = (students, id, std) => {
  
//   return students
// };


export default (state = initState, action) => {
  console.log(action.type)
  switch (action.type) {
    
    case attendanceConstants.STUDENT_ATTENDANCE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case attendanceConstants.STUDENT_ATTENDANCE_SUCCESS:
      state = {
        ...state,
        attendance: action.payload.attendance,
        loading: false,
      };
      console.log(state)
      break;
    case attendanceConstants.STUDENT_ATTENDANCE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
     

    
  }
  return state;
};


