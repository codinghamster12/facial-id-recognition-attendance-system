import axios from '../helpers/axios';
import { userConstants } from "./constants";
export const signup = (user) => {

    return async (dispatch) => {
        
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        try{
           
            const res= await axios.post(`/rest-auth/registration/`, {
                ...user
            });
    
            if(res.status == 201){
                
                
                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload: {
                        user:res.data,
                        message: "User registered successfully"
                    }
                })
    
            }
           
           

            
        }
        catch(error){
            
            if(error.response.status == 400){
              
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: error.response.data
                    }
                })
    
            }
            
        }
        


       
    }
}