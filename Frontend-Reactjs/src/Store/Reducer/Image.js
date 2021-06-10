import * as actions from '../Action/actionType'

const initialState ={
    response:null,
    images:null,
    loading:false
}
 const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actions.UPLOAD_IMAGE):
            return{
                ...state,
                response:action.response
            }
        case(actions.IMAGE_LIST):
            return{
                ...state,
                images:action.images,
                loading:true
            }    
                                  
        default:
            return state    
    }
 }

 export default reducer