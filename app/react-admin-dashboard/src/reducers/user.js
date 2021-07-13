import { userConstants } from '../actions/constants'

const initState= {
   
    user: {}, 
    error: null,
    message:null
    
  
    
}

export default(state= initState, action)=>{
    console.log(action)
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state={
                ...state,
                // authenticating: true,
           
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state={
                ...state,
                // authenticate: true,
                user: action.payload.user,
                message: action.payload.message
                // authenticating: false,
            }
            console.log(state);
        
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state={
                ...state,
                error: action.payload.error

            }
            break;
        case userConstants.GET_USER_REQUEST:
            state = {
                ...state,
              
            };
            break;
        case userConstants.GET_USER_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                
            };
            break;
        case userConstants.GET_USER_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                
            };
            break;
        
        
        
    }

    return state;

}