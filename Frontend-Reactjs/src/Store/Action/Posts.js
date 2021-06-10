import * as actions from './actionType'
import axios from '../../axios'

export const setPosts = posts =>{
    return{
        type:actions.SET_POSTS,
        posts:posts
    }
}

export const postDetail = post =>{
    return{
        type:actions.POST_DETAIL,
        post:post
    }
}

export const setComments=commments=>{
    return{
        type:actions.POST_COMMENTS,
        commments:commments
    }
}

export const commentpost=data=>{
    return{
        type:actions.COMMENT_POST,
        return_data:data
    }
}

export const replypost=data=>{
    return{
        type:actions.REPLY_POST,
        return_data:data
    }
}

export const setDrafts=drafts=>{
    return{
        type:actions.SET_DRAFTS,
        drafts:drafts
    }
}

export const createPost=responsePost=>{
    return{
        type:actions.CREATE_POST,
        responsePost:responsePost
    }
}

export const setCoverImage=image=>{
    return{
        type:actions.SET_COVERIMAGE,
        image:image
    }
}

export const editPost=response=>{
    return{
        type:actions.EDIT_POST,
        response:response
    }
}

export const isCompleted=()=>{
    return{
        type:actions.IS_COMPLETED
    }
}

export const publish=(date)=>{
    return{
        type:actions.PUBLISH,
        date:date

    }
}

export const setUpvotes=(response)=>{
    return{
        type:actions.UPVOTESUPDATE,
        response:response

    }
}

export const setSearchPosts=result=>{
    return{
        type:actions.SEARCH,
        result:result
    }
}


export const initPosts = (pagenumber)=>{
    return dispatch =>{
        axios.get(`http://127.0.0.1:8000/api/post/published/list/?page=${pagenumber}`)
              .then(response=>{
                     dispatch(setPosts(response.data))
              })
              .catch(error=>{
                  console.log(error)
              })
    }
}

export const setPostDetail = id=>{
    return dispatch =>{
        axios.get(`http://127.0.0.1:8000/api/post/detail/${id}`)
              .then(response=>{
                 
                  dispatch( postDetail(response.data))
                  
                  dispatch(setUpvotes(response.data.upvotes))
              })
              .catch(error=>{
                  console.log(error)
              })
    }
}

export const initComments = id=>{
    return dispatch =>{
        axios.get(`http://127.0.0.1:8000/api/comment/list/${id}`)
              .then(response=>{
                  
                  dispatch( setComments(response.data))
              })
              .catch(error=>{
                  console.log(error)
              })
    }
}

export const postComment = (post,content, parent,owner,) =>{
    return dispatch=>{
        const authdata={
            post:post,
            content:content,
            parent:parent,
            owner:owner
            
        }

        axios.post('http://127.0.0.1:8000/api/comment/create/', authdata)
         .then(response=>{
             if(response.data.parent){
                 dispatch(replypost(response.data))
             }else{
                dispatch(commentpost(response.data))
             }
         })
         .catch(error=>{
             console.log(error)
         })
    }
}

export const initDrafts=(authorPk)=>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/post/draft/list/${authorPk}`)
            .then(response=>{
                
                dispatch(setDrafts(response.data))
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const uploadPost=(authData, coverimage)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/api/post/create/', authData)
            .then(response=>{
                
                dispatch(createPost(response.data))
               
                    axios.put(`http://127.0.0.1:8000/api/post/coverimage/${response.data.pk}`, coverimage)
                        .then(response=>{
                            
                            dispatch(setCoverImage(response.data))
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                
            })
            .catch(error=>{
                console.log(error)
            })

    }
}

export const updatePost=(authData,coverimage, id)=>{
    return dispatch=>{
        axios.put(`http://127.0.0.1:8000/api/post/edit/${id}`, authData)
            .then(response=>{
                
                dispatch(editPost(response.data))
                axios.put(`http://127.0.0.1:8000/api/post/coverimage/${response.data.pk}`, coverimage)
                        .then(response=>{
                            
                            dispatch(setCoverImage(response.data))
                        })
                        .catch(error=>{
                            console.log(error)
                        })
            })
            .catch(error=>{
                console.log(error)
            })

    }

}

export const onPublish=(id, date)=>{
    return dispatch=>{
        axios.put(`http://127.0.0.1:8000/api/post/publish/${id}`, date)
            .then(response=>{
                
                dispatch(publish(response.data))
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const upvotePost=(user, post, upvotes)=>{
    return dispatch=>{
        const authData = {
            user:user,
            post:post
        }

        const upvote={
            upvotes:upvotes
        }

        axios.post(`http://127.0.0.1:8000/api/post/like/`, authData)
            .then(response=>{
                
                
                if(response.data.user){
                    axios.put(`http://127.0.0.1:8000/api/post/edit/upvotes/${response.data.post}`, upvote)
                        .then(response=>{
                           
                            dispatch(setUpvotes(response.data.upvotes))
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                }
            })
            .catch(error=>{
                console.log(error)
            })

    }

}

export const searchPost=(authData)=>{
    return dispatch=>{
        axios.post(`http://127.0.0.1:8000/api/post/search/`, authData)
            .then(response=>{
                console.log(response.data)
                dispatch(setSearchPosts(response.data))
                
            })
            .catch(error=>{
                console.log(error)
            })

    }

}