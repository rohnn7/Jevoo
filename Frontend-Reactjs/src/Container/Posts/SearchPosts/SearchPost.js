import React, {Component} from 'react'
import classes from './SearchPost.module.css'
import { connect} from 'react-redux'
import * as PostActions from '../../../Store/Action/Posts'
import Loader from '../../../Component/UI/Loader/Loader'
import Footer from '../../../Component/Footer/Footer'
import * as UserActions from '../../../Store/Action/User'
import ReactHtmlParser from 'react-html-parser';
import Card from '../../../Component/HomePage/Card/Card'
import {Link} from 'react-router-dom'

class SearchPost extends Component {


    onSavePostHandler=(postpk)=>{
        if(localStorage.getItem('pk')){
            this.props.onSavePost(localStorage.getItem('pk'), postpk)
        }
        
    }

    

    onRedirectHandler=()=>{
        this.props.onRedirect('/Search/Results')
    }

    

    render(){
        var node;        
        var posts=(<Loader className={classes.loader} />);
        var count=null;
        var query=null
        
        if(!this.props.loading){
            if(this.props.posts){
                posts = this.props.posts.data.map(post=>{
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
                              image={post.cover_image}
                              content={node}
                              save={()=>this.onSavePostHandler(post.pk)}  />
                    )
                })
               query=this.props.posts.query
               count=this.props.posts.results
                
            }
            
        }

        

        return(
           <div>
               <header className={classes.postcontainer}>
                   <p className={classes.posthead3}><Link to='/' ><i className="fa fa-arrow-left" aria-hidden="true"></i></Link></p>
                   <p className={classes.posthead}>Results</p>
                   {localStorage.getItem('token')?(<p className={classes.posthead2} >Welcome, {localStorage.getItem('username')}</p>):(<p className={classes.posthead2} ><Link to='/Auth' onClick={this.onRedirectHandler} >Login/Singnup</Link></p>)}
                </header> 
                {query?<div className={classes.results} >{count} results has been found for "{query}"</div>:null}
                <div className={classes.wraper}>                
                      {posts}  
                                  
                </div>
                
                
                <br/>
                <Footer/>
                
           </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        posts:state.post.searchPosts,
        loading:state.post.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
       onSearch:authdata=>dispatch(PostActions.searchPost(authdata)),
       onSavePost:(user, post)=>dispatch(UserActions.savePost(user, post)),
       onRedirect:path=>dispatch(UserActions.redirect(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( SearchPost);

