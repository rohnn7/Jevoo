import * as actions from '../Action/actionType'

const initialState ={
    user:null,
    user_register:null,
    isloggedin:false,
    authors:null,
    loading:true,
    savePostResponse:null,
    savedPosts:null,
    likedPosts:null,
    userdetail:null,
    userupdate:null,
    loginMessage:null,
    registermessage:null,
    path:null
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actions.USER_LOGIN):
               return{
                   ...state,
                   user:action.user,
                   loading:false,
                   isloggedin:true
               }  
        case(actions.USER_REGISTER):
               return{
                   ...state,
                   user_register:action.user,
                   loading:false,
                   isloggedin:true
               } 
        case(actions.SET_AUTHOR):      
                return{
                    ...state,
                    authors:action.authors
                }
        case(actions.SAVEPOST):      
                return{
                    ...state,
                    savePostResponse:action.response
                }
        case(actions.SAVEDPOSTS):      
                return{
                    ...state,
                    savedPosts:action.response
                }     
        case(actions.UPVOTEDPOSTS):      
                return{
                    ...state,
                    likedPosts:action.response
                }
        case(actions.USERDETAIL):      
                return{
                    ...state,
                    userdetail:action.response
                }
        case(actions.USERUPDATE):      
                return{
                    ...state,
                    userupdate:action.response
                }
        case(actions.LOGINMESSAGE):      
                return{
                    ...state,
                    loginMessage:action.message
                } 
        case(actions.REGISTERMESSAGE):      
                return{
                    ...state,
                    registermessage:action.message
                }
        case(actions.REDIRECT):      
                return{
                    ...state,
                    path:action.path
                }
        default:
            return state    
    }
 }

 export default reducer