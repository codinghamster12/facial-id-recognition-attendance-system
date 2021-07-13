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

export const getUser = (id) => {
    return async (dispatch) => {
        dispatch({
            type: userConstants.GET_USER_REQUEST
        })

        const token= localStorage.getItem('token')
        const headers= {
            'Authorization': `Token ${token}`
        }

        try{
            const res= await axios.get(`/users/${id}`, { headers: headers })
            if(res.status == 200){
                console.log(res.data)
                dispatch({
                    type: userConstants.GET_USER_SUCCESS,
                    payload:{
                        user: res.data
                        
                    }
                })
            }
        }
        catch(error){
            if(error.response.status == 404 || error.response.status == 400){
                dispatch({
                    type: userConstants.GET_USER_FAILURE,
                    payload:{
                        error: 'Something went wrong'
                    }

                })

            }
        }
    }
}