import * as actions from '../Action/actionType'

const initialState ={
    serieses:null,
    series_detail:null,
    author_serieses:null,
    response:null,
    loading:true,
    series_image:null,
    series_posts:null
}
 const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actions.SERIES_LIST):
            return{
                ...state,
                series:action.serieses,
                loading:false
            }
        case(actions.SERIES_DETAIL):
            return{
                ...state,
                series_detail:action.series,
                loading:false
            }
        case(actions.AUTHOR_SERIES):
            return{
                ...state,
                author_serieses:action.authorSerieses,
                loading:false
            }
        case(actions.CREATE_SERIES):
            return{
                ...state,
                response:action.response,
                loading:false
            }        
        case(actions.SERIESIMAGE):
            return{
                ...state,
               series_image:action.image
            }  
        case(actions.SERIESPOSTS):
            return{
                ...state,
               series_posts:action.response
            }                      
                                
        default:
            return state    
    }
 }

 export default reducer