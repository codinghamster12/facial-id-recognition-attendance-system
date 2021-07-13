import { studentConstants } from './constants'
import axios from '../helpers/axios';


export const getStudents = () => {

    return async (dispatch) => {
        dispatch({
            type: studentConstants.GET_STUDENTS_REQUEST
        })
        try{
            const res= await axios.get(`/student/`)
            
            if(res.status == 200){
                console.log(res.data)
                dispatch({
                    type: studentConstants.GET_STUDENTS_SUCCESS,
                    payload:{
                        students: res.data
                        
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


export const addStudent = (form) => {
  
    return async (dispatch) => {
     
        dispatch({
            type: studentConstants.ADD_STUDENTS_REQUEST
        })
        console.log('ok')
        
        const token= localStorage.getItem('token')
        const headers= {
            // "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
            'Authorization': `Token ${token}`
            
        }

        try{
            const res= await axios.post(`/students/`, form, { headers: headers })
            if(res.status == 201){
                console.log('ok')
                dispatch({
                    type: studentConstants.ADD_STUDENTS_SUCCESS,
                    payload:{
                        message: 'Student created successfully'
                    }

                })
               
            }

        }
        catch(error){
            if(error.response.status == 404 || error.response.status == 400){
                dispatch({
                    type: studentConstants.ADD_STUDENTS_FAILURE,
                    payload:{
                        error: error.response.data
                    }

                })

            }

            
        }

    

        

    }
}

export const studentUpdate = (id, form) => {
    return async (dispatch) => {
        dispatch({
            type: studentConstants.UPDATE_STUDENTS_REQUEST
        })
        const headers= {
            "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
            
        }
        try{
            const res=await axios.put(`/student/${id}/`, form, {headers:headers})
            if(res.status == 200){
                dispatch({
                    type: studentConstants.UPDATE_STUDENTS_SUCCESS,
                    payload: {
                        student: res.data,
                        id: res.data.id,
                        message: 'Student updated successfully.'
                    }
                })
                alert('Student updated successfully')
            }
           
        }
        catch(error){
            if(error.response.status == 404 || error.response.status == 400){
                dispatch({
                    type: studentConstants.UPDATE_STUDENTS_FAILURE,
                    payload:{
                        error: 'Something went wrong'
                    }

                })

            }
            
        }

    }
}

export const getStudent = (id) => {
    return async (dispatch) => {
        dispatch({
            type: studentConstants.GET_STUDENT_REQUEST
        })

        const token= localStorage.getItem('token')
        const headers= {
            'Authorization': `Token ${token}`
        }

        try{
            const res= await axios.get(`/students/${id}`, { headers: headers })
            if(res.status == 200){
                console.log(res.data)
                dispatch({
                    type: studentConstants.GET_STUDENT_SUCCESS,
                    payload:{
                        student: res.data
                        
                    }
                })
            }
        }
        catch(error){
            if(error.response.status == 404 || error.response.status == 400){
                dispatch({
                    type: studentConstants.GET_STUDENT_FAILURE,
                    payload:{
                        error: 'Something went wrong'
                    }

                })

            }
        }
    }
}

export const studentDelete = (id) => {
    return async (dispatch) => {
        dispatch({
            type: studentConstants.DELETE_STUDENTS_REQUEST
        })
        const headers= {
            "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
            
        }
        try{
            const res=await axios.delete(`/student/${id}/`, null, {headers:headers})
            if(res.status == 204){
                dispatch({
                    type: studentConstants.DELETE_STUDENTS_SUCCESS,
                    payload: {
                        message: 'Student deleted successfully',
                        id
                        
                    }
                })
                alert('Student deleted successfully')
            }
           
        }
        catch(error){
            if(error.response.status == 404 || error.response.status == 400){
                dispatch({
                    type: studentConstants.DELETE_STUDENTS_FAILURE,
                    payload:{
                        error: error.response.data
                    }

                })

            }
            
        }

    }
}

