import * as actions from './actionType'
import axios from '../../axios'


export const uploadImage=response=>{
    return{
        type:actions.UPLOAD_IMAGE,
        response:response
    }
}

export const setImages=images=>{
    return{
        type:actions.IMAGE_LIST,
        images:images
    }
}

export const initImages=authData=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/api/post/image/upload/', authData)
            .then(response=>{
                
                dispatch(uploadImage(response.data))
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const getImages=id=>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/post/image/list/${id}`)
            .then(response=>{
                dispatch(setImages(response.data))
            })
            .catch(error=>{
                console.log(error)
            })
    }
}