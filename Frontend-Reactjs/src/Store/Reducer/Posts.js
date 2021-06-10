import * as actions from '../Action/actionType'

const initialState ={
    newPost:null,
    responsePost:null,
    drafts:null,
    posts:null,
    postDetail:null,
    loading:true,
    comments:null,
    commentreponse:null,
    completed:false,
    date:null,
    upvotes:null,
    searchPosts:null
}
 const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actions.SET_POSTS):
            return{
                ...state,
                posts:action.posts,
                loading:false
            }
        case(actions.POST_DETAIL):
            return{
                ...state,
                postDetail:action.post,
                loading:false
            }   
        case(actions.POST_COMMENTS):
            return{
                ...state,
                comments:action.commments,
                loading:false
            }  
        case(actions.COMMENT_POST):
            return{
                ...state,
                comments:[...state.comments, action.return_data],      
                loading:false
            }  
        case(actions.REPLY_POST):               
            return {
                ...state,
                comments: state.comments.map(comment=>{
                    if(comment.pk===action.return_data.parent){
                 
                     return{...comment, reply:[ ...comment.reply, action.return_data]}
                     
                    }
                      return comment    
                })
            }
        case(actions.SET_DRAFTS):
            return{
                ...state,
                drafts:action.drafts,
                loading:false
            }
        case(actions.CREATE_POST):
            return{
                ...state,
                responsePost:action.responsePost

            }
        case(actions.SET_COVERIMAGE):
            return{
                ...state,
                responsePost:{
                    ...state.responsePost,
                    'cover_image':action.image
                },
                completed:true
            } 
        case(actions.EDIT_POST):
                return{
                    ...state,
                    responsePost:action.responsePost
            }
        case(actions.IS_COMPLETED):
                return{
                    ...state,
                    completed:false
            }
        case(actions.PUBLISH):
                return{
                    ...state,
                    date:action.date
            }
        case(actions.UPVOTESUPDATE):
            return{
                ...state,
                upvotes:action.response
        }
        case(actions.SEARCH):
            return{
                ...state,
                searchPosts:action.result,
                loading:false
        }             

        default:
            return state    
    }
 }

 export default reducer