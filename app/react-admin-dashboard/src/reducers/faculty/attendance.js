import { attendanceConstants } from "../../actions/constants";

const initState = {
  today:[],
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
    
    case attendanceConstants.CLASS_ATTENDANCE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case attendanceConstants.CLASS_ATTENDANCE_SUCCESS:
      state = {
        ...state,
        attendance: action.payload.attendance,
        loading: false,
      };
      console.log(state)
      break;
    case attendanceConstants.CLASS_ATTENDANCE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
      case attendanceConstants.TODAY_ATTENDANCE_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case attendanceConstants.TODAY_ATTENDANCE_SUCCESS:
        state = {
          ...state,
          today: action.payload.today,
          loading: false,
        };
        console.log(state)
        break;
      case attendanceConstants.TODAY_ATTENDANCE_FAILURE:
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
        };
        break;
     

    
  }
  return state;
};


