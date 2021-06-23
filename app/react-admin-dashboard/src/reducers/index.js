import { combineReducers } from 'redux';
import studentReducer from './students'
import authReducer from './auth'
import classReducer from './classes'
import userReducer from './user'
import attendanceReducer from './attendance'
import classAttendanceReducer from './faculty/attendance'


const initialState = {
    sidebarShow: 'responsive'
  }
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      default:
        return state
    }
  }
  

const rootReducer= combineReducers({
    nav: changeState,
    student: studentReducer,
    auth: authReducer,
    class: classReducer,
    user: userReducer,
    attendance: attendanceReducer,
    classAttendance: classAttendanceReducer
    
})

export default rootReducer;
