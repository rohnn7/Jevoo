import React, { Component } from 'react'
import classes from './PostsList.module.css'
import Card from '../../../Component/HomePage/Card/Card'
import { connect} from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import Loader from '../../../Component/UI/Loader/Loader'
import * as PostActions from '../../../Store/Action/Posts'
import * as UserActions from '../../../Store/Action/User'
import {Link} from 'react-router-dom'
import PageBullet from '../../../Component/UI/PageBullet/PageBullet'
import Footer from '../../../Component/Footer/Footer'

class PostsList extends Component{

    state={
        page:1,
        search:null
    }

    componentDidMount(){
        this.props.onInitPosts(1)
    } 

    

    onSavePostHandler=(postpk)=>{
        if(localStorage.getItem('pk')){
            this.props.onSavePost(localStorage.getItem('pk'), postpk)
        }
        
    }

    onChangeHandler=(event)=>{
        this.setState({
          search:event.target.value
        })
      }
  
      onSearch=()=>{
        if(this.state.search){
          var authdata={
            'search':this.state.search
          }
          this.props.onSearch(authdata)
          this.props.history.push('/Search/Results')
        }
      }

    

    onRedirectHandler=()=>{
        this.props.onRedirect('/Posts')
    }

    onPageHandler=(pn)=>{
        this.setState({page:pn})
    }

    render(){
        var node;        
        var posts=(<Loader className={classes.loader} />);
        var pages=null;
        var i;
        var page=1;
        var currentpage=1;
        var totalpages=1;
        var search=(
            <div className={classes.search} >
                <input className={classes.label} 
                       placeholder='what are you searching for?' 
                       value={this.state.search}
                       onChange={this.onChangeHandler}
                />
                <button className={classes.searchButton} onClick={this.onSearch} ><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
        )
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
                              image={post.cover_image}
                              content={node}
                              save={()=>this.onSavePostHandler(post.pk)}  />
                    )
                })

                for(i=0; i<this.props.posts.total_pages;i++){
                    if(page<=3){
                        pages=(
                            <>
                                {pages}
                                {this.props.posts.page_number===page 
                                ?<PageBullet  
                                page={page}
                                active={true}
                                redirect={this.props.onInitPosts}
                                />
                                :<PageBullet  
                                page={page}
                                active={false}
                                redirect={this.props.onInitPosts}
                                />}
                            </>
                        )
                    }
                     if(page===this.props.posts.page_number&&page>3&&page!==this.props.posts.total_pages){
                        pages=(
                            <>
                                {pages}
                                <div className={classes.dot} >...</div>
                                {this.props.posts.page_number===page 
                                ?<PageBullet  
                                page={page}
                                active={true}
                                redirect={this.props.onInitPosts}
                                />
                                :<PageBullet  
                                page={page}
                                active={false}
                                redirect={this.props.onInitPosts}
                                />}
                            </>
                        )
                    }

                    if(page===this.props.posts.total_pages && page>3 ){
                        pages=(
                            <>
                                {pages}
                                <div className={classes.dot} >...</div>
                                {this.props.posts.page_number===page 
                                ?<PageBullet  
                                page={page}
                                active={true}
                                redirect={this.props.onInitPosts}
                                />
                                :<PageBullet  
                                page={page}
                                active={false}
                                redirect={this.props.onInitPosts}
                                />}
                            </>
                        )
                    }
                    page++;
                }
                currentpage=this.props.posts.page_number
                totalpages=this.props.posts.total_pages
                
            }
            
        }

        

        return(
           <div>
               <header className={classes.postcontainer}>
                   <p className={classes.posthead3}><Link to='/' ><i className="fa fa-arrow-left" aria-hidden="true"></i></Link></p>
                   <p className={classes.posthead}>Blogs</p>
                   {localStorage.getItem('token')?(<p className={classes.posthead2} >Welcome, {localStorage.getItem('username')}</p>):(<p className={classes.posthead2} ><Link to='/Auth' onClick={this.onRedirectHandler} >Login/Singnup</Link></p>)}
                </header> 
                <div className={classes.searchContainer}>
                    {search}
                </div>
                <div className={classes.wraper}> 
                              
                      {posts}  
                                  
                </div>
                
                <div className={classes.pages} >
                    {currentpage===1?null:<div className={classes.pageicon} onClick={()=>this.props.onInitPosts(1)} ><i className="fa fa-angle-double-left" aria-hidden="true"></i></div>}
                    {currentpage===1?null:<div className={classes.pageicon} onClick={()=>this.props.onInitPosts(currentpage-1)} ><i className="fa fa-angle-left" aria-hidden="true"></i></div>}
                    {pages}
                    {currentpage===totalpages?null:<div className={classes.pageicon} onClick={()=>this.props.onInitPosts(currentpage+1)} ><i className="fa fa-angle-right" aria-hidden="true"></i></div>}
                    {currentpage===totalpages?null:<div className={classes.pageicon} onClick={()=>this.props.onInitPosts(totalpages)} ><i className="fa fa-angle-double-right" aria-hidden="true"></i></div>}
                </div>
                <br/>
                <Footer/>
                
           </div>
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
        onSearch:authdata=>dispatch(PostActions.searchPost(authdata)),
        onInitPosts:(pn)=>dispatch(PostActions.initPosts(pn)),
        onSavePost:(user, post)=>dispatch(UserActions.savePost(user, post)),
        onRedirect:path=>dispatch(UserActions.redirect(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( PostsList);