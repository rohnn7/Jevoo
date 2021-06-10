import * as actions from './actionType'
import axios from '../../axios'

export const userLogin = (user)=>{
    return{
        type:actions.USER_LOGIN,
        user:user       
    }
}

export const userRegister = (user)=>{
    return{
        type:actions.USER_REGISTER,
        user:user       
    }
}

export const setAuthor = authors =>{
    return{
        type:actions.SET_AUTHOR,
        authors:authors
    }
}

export const setSavedPostResponse = response =>{
    return{
        type:actions.SAVEPOST,
        response:response
    }
}

export const setSavedPosts = response =>{
    return{
        type:actions.SAVEDPOSTS,
        response:response
    }
}

export const setUpVotedPosts = response =>{
    return{
        type:actions.UPVOTEDPOSTS,
        response:response
    }
}

export const setUserDetails = response=>{
    return{
        type:actions.USERDETAIL,
        response:response
    }
}

export const setUserUpdate = response=>{
    return{
        type:actions.USERUPDATE,
        response:response
    }
}

export const setLoginMessage = message =>{
    return{
        type:actions.LOGINMESSAGE,
        message:message
    }
}

export const setRegisterMessage = message =>{
    return{
        type:actions.REGISTERMESSAGE,
        message:message
    }
}

export const redirect = path=>{
    return{
        type:actions.REDIRECT,
        path:path
    }
}


export const Login=(username, password)=>{
    return dispatch=>{
        const authData = {
            username:null,
            email:username,
            password:password
        }
        axios.post('http://127.0.0.1:8000/api/user/login/', authData)
              .then(response=>{
                if(response.data.pk){
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('pk', response.data.pk)
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('is_staff', response.data.is_staff)
                    dispatch(userLogin(response.data))
                }else if(response.data.message){
                    dispatch(setLoginMessage(response.data.message))
                }               
                
                  
                  
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}
export const Register=(firstname, lastname, email,username, password)=>{
    return dispatch=>{
        const authData = {
            first_name:firstname,
            last_name:lastname,
            email:email,
            username:username,
            password:password
        }
        axios.post('http://127.0.0.1:8000/api/user/register/', authData)
              .then(response=>{
                console.log(response.data)
                if(response.data.pk){
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('pk', response.data.pk)
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('is_staff', response.data.is_staff)
                    dispatch(userRegister(response.data))
                }else if(response.data.message){
                    dispatch(setRegisterMessage(response.data.message))
                }
                
                  
              })
              .catch(error=>{
                  console.log(error)
                  console.log(error.data)
              })

    }
}

export const initAuthors=()=>{
    return dispatch=>{
        axios.get('http://127.0.0.1:8000/api/user/author/list/')
              .then(response=>{
                     dispatch(setAuthor(response.data))
              })
              .catch(error=>{
                  console.log(error)
              })
    }

}

export const savePost=(user, post)=>{
    return dispatch=>{
        const authData = {
            user:user,
            post:post
        }
        axios.post('http://127.0.0.1:8000/api/post/save/', authData)
              .then(response=>{
                
                    
                dispatch(setSavedPostResponse(response.data))
                  
                  
              })
              .catch(error=>{
                  console.log(error)
              })

    }
}

export const initSavedPosts=(user)=>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/post/savedpost/${user}`)
              .then(response=>{
                     
                     dispatch(setSavedPosts(response.data))
              })
              .catch(error=>{
                  console.log(error)
              })
    }

}

export const initUpVotedPosts=(user)=>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/post/likedpost/${user}`)
              .then(response=>{
                     
                     dispatch(setUpVotedPosts(response.data))
              })
              .catch(error=>{
                  console.log(error)
              })
    }

}

export const initUserDetails=user=>{
    return dispatch=>{
     axios.get(`http://127.0.0.1:8000/api/user/detail/${user}`)
        .then(response=>{
               
               dispatch(setUserDetails(response.data))
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const initUserResponse=(user, authdata)=>{
    return dispatch=>{
     axios.put(`http://127.0.0.1:8000/api/user/edit/${user}`, authdata)
        .then(response=>{
               
               dispatch(setUserUpdate(response.data))
        })
        .catch(error=>{
            console.log(error)
        })
    }
}