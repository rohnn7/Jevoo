import React, {Component} from 'react'
import classes from './SeriesDetail.module.css'
import { connect} from 'react-redux'
import * as SeriesActions from '../../../Store/Action/Series'
import Loader from '../../../Component/UI/Loader/Loader'
import {Link} from 'react-router-dom'
import HorizontalPostaCard from '../../../Component/Series/HorizontalPostCard/HorizontalPostCard'

class SeriesDetail extends Component{

    componentDidMount() {
        this.props.onSetSeriesDetail(this.props.match.params.id)
        this.props.onSetSeriesPosts(this.props.match.params.id)

    }

     onAddHandler=()=>{
        localStorage.setItem('series', this.props.match.params.id)
        this.props.history.push('/Admin/Post')
    }

    



    render(){
        var title=(<Loader/>)
        var posts = null
        var author=-1
        var authorname=null
        var des=null
        if(!this.props.loading){
            if(this.props.series){
                author=this.props.series.author
                des=this.props.series.description
                title=(<p >{this.props.series.series_title}</p>)
                posts=this.props.series.posts.map(post=>{
                    return(
                        <Link key={post.pk} className={classes.LinkedText} to={`/Post/${post.pk}`}>
                            <HorizontalPostaCard
                                key={post.pk}
                                title={post.title}
                                markdown={post.markdown}
                                image={post.cover_image}
                            />
                        </Link>
                    )
                }) 

                
                
            }

            if(localStorage.getItem('author')){
                authorname= localStorage.getItem('author')
                
            }
        }

        

        


        return(
            <div className={classes.DetailContainer}>
                <div className={classes.DetailHeading} >
                    {title}
                </div>
                <div className={classes.description} >
                    {des}
                </div>
                <div className={classes.SeriesContent} >
                    {posts}
                    {authorname===`${author}`
                        ? <p className={classes.posthead3} onClick={this.onAddHandler} ><i className="fa fa-plus" aria-hidden="true"></i>Post</p>
                        :null}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        series:state.series.series_detail,
        loading:state.series.loading,
        
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onSetSeriesDetail: (id)=>dispatch(SeriesActions.initSeriesDetail(id)),
        onSetSeriesPosts: (id)=>dispatch(SeriesActions.initSeriesPosts(id)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetail);