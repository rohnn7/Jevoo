import React, { Component } from 'react';
import classes from './Posts.module.css'
import Card from '../../Component/HomePage/Card/Card'
import ScrollContainer from 'react-indiana-drag-scroll'
import { connect} from 'react-redux'
import * as PostActions from '../../Store/Action/Posts'
import * as UserActions from '../../Store/Action/User'
import Loader from '../../Component/UI/Loader/Loader'
import ReactHtmlParser from 'react-html-parser';

class Posts extends Component{
    
    componentDidMount(){
        this.props.onInitPosts(1)
    }

    onSavePostHandler=(postpk)=>{
        if(localStorage.getItem('pk')){
            this.props.onSavePost(localStorage.getItem('pk'), postpk)
        }
    }

    render(){
        var node;        
        var posts=(<Loader className={classes.loader}/>);
        if(!this.props.loading){
            if(this.props.posts){
                posts = this.props.posts.results.map(post=>{
                    node = ReactHtmlParser(post.markdown)  
                    var d = new Date(post.published_date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
    
                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day; 
                          
                    d= [day, month,year ].join('/')     
                                  
                    return(
                        <Card className={classes.item}
                              key={post.pk}
                              id={post.pk}
                              title={post.title}
                              date={d} 
                              content={node}
                              image={post.cover_image}
                              save={()=>this.onSavePostHandler(post.pk)}  />
                    )
                })
            }
        }

        return(
            <ScrollContainer className={classes.wraper}>                
                <div className={classes.slidercontainer} >
                    {posts}
                </div>
            </ScrollContainer>
        )
    }
}

const mapStateToProps=state=>{
    return{
        posts:state.post.posts,
        loading:state.post.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onInitPosts:(pn)=>dispatch(PostActions.initPosts(pn)),
        onSavePost:(user, post)=>dispatch(UserActions.savePost(user, post)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( Posts);