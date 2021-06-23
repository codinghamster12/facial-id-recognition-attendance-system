import { classConstants } from "../actions/constants";

const initState = {
  classes: [],
  error: null,
  message: null
};

// const performUpdate = (students, id, std) => {
  
//   return students
// };


export default (state = initState, action) => {
  switch (action.type) {
    case classConstants.GET_CLASSES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case classConstants.GET_CLASSES_SUCCESS:
      state = {
        ...state,
        classes: action.payload.classes,
        loading: false,
      };
      console.log(state)
      break;
    case classConstants.GET_CLASSES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
      case classConstants.GET_UNREGISTERED_CLASSES_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case classConstants.GET_UNREGISTERED_CLASSES_SUCCESS:
        state = {
          ...state,
          classes: action.payload.classes,
          loading: false,
        };
        console.log(state)
        break;
      case classConstants.GET_UNREGISTERED_CLASSES_FAILURE:
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
        };
        break;

    
  }
  return state;
};


