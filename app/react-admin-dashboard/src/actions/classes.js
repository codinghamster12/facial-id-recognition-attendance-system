import { classConstants } from './constants'
import axios from '../helpers/axios';


export const getClasses = () => {

    return async (dispatch) => {
        dispatch({
            type: classConstants.GET_CLASSES_REQUEST
        })
        const token= localStorage.getItem('token')
        const headers= {
            'Authorization': `Token ${token}`
        }
        console.log(headers)
        try{

            const res= await axios.get(`/classes/`, {headers: headers})
            
            if(res.status == 200){
                console.log(res.data)
                dispatch({
                    type: classConstants.GET_CLASSES_SUCCESS,
                    payload:{
                        classes: res.data
                        
                    }
                })
            }

        }
        catch(error){
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

       
        
    }
}

export const getUnRegisteredClasses = () => {

    return async (dispatch) => {
        dispatch({
            type: classConstants.GET_UNREGISTERED_CLASSES_REQUEST
        })
        const token= localStorage.getItem('token')
        const headers= {
            'Authorization': `Token ${token}`
        }
        console.log(headers)
        try{

            const res= await axios.get(`/classes/enroll`, {headers: headers})
            
            if(res.status == 200){
                console.log(res.data)
                dispatch({
                    type: classConstants.GET_UNREGISTERED_CLASSES_SUCCESS,
                    payload:{
                        classes: res.data
                        
                    }
                })
            }

        }
        catch(error){
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

       
        
    }
}
