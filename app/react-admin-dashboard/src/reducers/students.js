import { studentConstants } from "../actions/constants";

const initState = {
  students: [],
  error: null,
  message: null
};

const performUpdate = (students, id, std) => {
  
  return students
};

export default (state = initState, action) => {
  switch (action.type) {
    case studentConstants.GET_STUDENTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case studentConstants.GET_STUDENTS_SUCCESS:
      state = {
        ...state,
        students: action.payload.students,
        loading: false,
      };
      break;
    case studentConstants.GET_STUDENTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    case studentConstants.UPDATE_STUDENTS_REQUEST:
      state = {
        ...state,
      };
      break;
    case studentConstants.UPDATE_STUDENTS_SUCCESS:
      const updatedStudents = state.students.map((student) => {
        return student.id == action.payload.id ? action.payload.student : student
      })
      console.log(updatedStudents)
      
 
      state = {
        ...state,
        students: updatedStudents,
        message: action.payload.message
      };
      break;
    case studentConstants.UPDATE_STUDENTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

      
    case studentConstants.DELETE_STUDENTS_REQUEST:
      state = {
        ...state,
      };
      break;
    case studentConstants.DELETE_STUDENTS_SUCCESS:
      const deletedStudents = state.students.filter((student) => {
        return student.id !== action.payload.id 
      })
      console.log(deletedStudents)
     
      
 
      state = {
        ...state,
        students: deletedStudents,
        message: action.payload.message
      };
      break;
    case studentConstants.DELETE_STUDENTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case studentConstants.ADD_STUDENTS_REQUEST:
      state={
        ...state
      }
      break;
    
    case studentConstants.ADD_STUDENTS_SUCCESS:
      state={
        ...state,
        message: action.payload.message

      }
      break;
    case studentConstants.ADD_STUDENTS_FAILURE:
      state={
        ...state,
        error: action.payload.error
      }
  }
  return state;
};
