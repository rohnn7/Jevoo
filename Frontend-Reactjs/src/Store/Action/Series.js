import * as actions from './actionType'
import axios from '../../axios'


export const setSeries=(serieses)=>{
    return{
        type:actions.SERIES_LIST,
        serieses:serieses

    }
}

export const setSeriesDetail=series=>{
    return{
        type:actions.SERIES_DETAIL,
        series:series
    }
}

export const setAuthorSeries=authorSerieses=>{
    return{
        type:actions.AUTHOR_SERIES,
        authorSerieses:authorSerieses
    }
}

export const createSeries=resposnse=>{
    return{ 
        type:actions.CREATE_SERIES,
        response:resposnse
    }
}

export const setSeiesImage=image=>{
    return{
        type:actions.SERIESIMAGE,
        image:image
    }
}

export const setSeriesPosts=resposnse=>{
    return{
        type:actions.SERIESPOSTS,
        response:resposnse
    }
}

export const initSeries = (pagenumber)=>{
    return dispatch =>{
        axios.get(`http://127.0.0.1:8000/api/series/list/?page=${pagenumber}`)
              .then(response=>{
                     
                     dispatch(setSeries(response.data))
              })
              .catch(error=>{
                  console.log(error)
              })
    }
}

export const initSeriesDetail = (id) =>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/series/detail/${id}`)
            .then(response=>{      
               dispatch(setSeriesDetail(response.data))
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initAuthorSerieses=authorPk=>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/series/list/${authorPk}`)
            .then(response=>{
                
                dispatch(setAuthorSeries(response.data))
            })
            .catch(error=>{
                console.log(error)
            })

    }
}

export const uploadSeries=(title, description, author, seriesimage)=>{    
    return dispatch=>{
        const authData={
            series_title:title,
            description:description,
            author:author
        }
        axios.post(`http://127.0.0.1:8000/api/series/create/`, authData)
            .then(response=>{
                
                dispatch(createSeries(response.data))
                axios.put(`http://127.0.0.1:8000/api/series/series_image/${response.data.pk}`, seriesimage)
                    .then(response=>{
                        
                        dispatch(setSeiesImage(response.data))
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

export const initSeriesPosts = (id) =>{
    return dispatch=>{
        axios.get(`http://127.0.0.1:8000/api/series/series/posts/${id}`)
            .then(response=>{      
               dispatch(setSeriesPosts(response.data))
            })
            .catch(error=>{
                console.log(error)
            })
    }
}
