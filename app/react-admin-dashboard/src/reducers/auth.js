import { authConstants } from '../actions/constants'

const initState= {
    token: null,
    authenticate: false,
    authenticating: false,
    error: null,
    user: {}, 
    
  
    
}

export default(state= initState, action)=>{
    console.log(action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,
                authenticating: true,
           
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state={
                ...state,
                authenticate: true,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
            }
        
            break;
        case authConstants.LOGIN_FAILURE:
            state={
                ...state,
                error: action.payload.error

            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state={
                ...state,
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state={
                ...state,
                error: action.payload.error,
            }
            break;
        
    }

    return state;

}