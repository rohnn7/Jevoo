import React, {Component} from 'react'
import classes from './PostDetail.module.css'
import Loader from '../../../Component/UI/Loader/Loader'
import Message from '../../../Component/UI/Message/Message'
import * as PostActions from '../../../Store/Action/Posts'
import * as UserActions from '../../../Store/Action/User'
import { connect} from 'react-redux'
import Comment from '../../../Component/Comment/Comment'
import ReactHtmlParser  from 'react-html-parser';
import { Link } from 'react-router-dom'

class PostDetail extends Component{

    componentDidMount(){
        this.props.onSetPostDetail(this.props.match.params.id)
        this.props.onSetComments(this.props.match.params.id)
        
    }
    
    
    

    state={
        content:'',
        comments:this.props.comments,
        reply:false,
        pk:null,
        username:null,
        upvotes:this.props.upvotes,
        show:true,
        message:null,
        error:true,
        post_pk:Number(this.props.match.params.id),
        change:true
    }

   
    

    //  componentDidUpdate(){
    //     console.log(this.props.comments)
    //  }




    onInpuChangeHandler=event=>{
        this.setState({
            content:event.target.value
        })
    }

    onPostHandler=()=>{
        var username=1
        if(localStorage.getItem('token')){
            username= localStorage.getItem('pk')
        }
        this.props.onPostComment(this.props.match.params.id,this.state.content,null, username)
        this.setState({
            content:''
        })


    }

    onReply=(pk, username)=>{
        this.setState({
            reply:true,
            pk:pk,
            username:username,
            content:`@${username}`
        })
        
    }

    onReplyHandler=()=>{
        var username=1
        if(localStorage.getItem('token')){
            username= localStorage.getItem('pk')
        }
        this.props.onPostComment(this.props.match.params.id,this.state.content,this.state.pk, username)
        this.setState({
            reply:false,
            content:''
        })
    }

    onRemoveReply=()=>{
        this.setState({
            reply:false,
            username:null,
            pk:null, 
            content:'', 
            
        })
    }

    onEditHandler=()=>{
        localStorage.setItem('post', this.props.match.params.id)
        this.props.history.push('/Admin/Post/Edit')
    }

    onSavePostHandler=()=>{
        if(localStorage.getItem('pk')){
            this.props.onSavePost(localStorage.getItem('pk'), this.props.match.params.id)
            this.setState({
                show:true,
                error:false,
                message:'The post is saved!'
            })
        }else{
            this.setState({
                show:true,
                error:true,
                message:(<Link to='/Auth' onClick={this.onRedirectHandler} >You need to be logged in</Link>)
            })
        }
    }

    onLikedPostHandler=(upvotes)=>{
        if(localStorage.getItem('pk')){
           
            this.props.onUpvotePost(localStorage.getItem('pk'), this.props.match.params.id, upvotes+1)
            this.setState({
                show:true,
                error:false,
                message:'The post is liked!'
            })
           
        }else{
            this.setState({
                show:true,
                error:true,
                message:(<Link to='/Auth' onClick={this.onRedirectHandler} >You need to be logged in</Link>)
            })
        }
    }

    onRedirectHandler=()=>{
        this.props.onRedirect(`/Post/${this.props.match.params.id}`)
    }

    onSeriesNavigationHandler=(series)=>{
        this.props.history.push(`/Series/${series}`)                    
    }

    onPageNavigationHandler=(post)=>{
        var change= this.state.change
        this.setState({
            change:!change
        }) 
        this.props.history.replace(`/Post/${post}`)   
                        
    }


    onHide=()=>{
        this.setState({
            show:false
        })
    }

    render(){
        var content=(<Loader/>);
        var node=null;
        var pointer=null;
        var comments =(<Loader/>);
        var edit=null;
        var cover_image=null;
        var d=null;
        var upvotes = null
        var author=null;
        var message=null;
        var rederict=null;
        var length=null;
        var index=null
        if(!this.props.loading){
            pointer=this.props.post

            if(pointer){
                content=(<p className={classes.postdetailHeading}>{this.props.post.title}</p>)
                author=(<p className={classes.author}>~ by {this.props.post.author}</p>)
                node = ReactHtmlParser(this.props.post.markdown)
                upvotes= this.props.upvotes

                if(this.props.post.series){
                    if(this.props.series_posts){
                        length=this.props.series_posts.posts.length
                        index=this.props.series_posts.posts.findIndex(post=>post.pk===this.state.post_pk)
                        rederict=(
                            <div className={classes.pageNavigation} >
                                {this.props.series_posts.posts[0].pk===this.state.post_pk?null: <div className={classes.onNavigation} onClick={()=>this.onPageNavigationHandler(this.props.series_posts.posts[index-1].pk)}  ><i className="fa fa-arrow-left" aria-hidden="true"></i>Prev</div>}
                                {this.props.series_posts.posts[length-1].pk===this.state.post_pk?null: <div className={classes.onNavigation} onClick={()=>this.onPageNavigationHandler(this.props.series_posts.posts[index+1].pk)} >Next<i className="fa fa-arrow-right" aria-hidden="true"></i></div>}
                            </div>
                        )

                    }else{
                        rederict=(
                            <div className={classes.seriesNavigation} onClick={()=>this.onSeriesNavigationHandler(this.props.post.series)} >
                                    Other Posts in Series<i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </div>
                        )                                                                           
                    }
                }

                cover_image=this.props.post.cover_image
                 d = new Date(this.props.post.published_date);
                   var month = '' + (d.getMonth() + 1);
                   var day = '' + d.getDate();
                   var year = d.getFullYear();

                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day; 
                          
                    d= [day, month,year ].join('/') 

                

            }

            
           
        }
        if(!this.props.loading){
            pointer=this.props.comments
            if(pointer){
               comments= this.props.comments.map(comment=>{
                   var reply =null;
                    if(comment.reply){
                        reply= comment.reply.map(reply=>{
                            return(
                                <div key={reply.pk} className={classes.reply}>
                                    <Comment 
                                        key={reply.pk}
                                        username={reply.username}
                                        content={reply.content}
                                        date={reply.created_date}
                                        reply={()=>{this.onReply(comment.pk, reply.username)}}
                                         />
                                        <hr/>
                                </div>
                            )
                        })
                    }
                    return(
                       <div key={comment.pk} >
                            <Comment 
                            key={comment.pk}
                            username={comment.username}
                            content={comment.content}
                            date={comment.created_date}
                            reply={()=>{this.onReply(comment.pk, comment.username)}}
                             />
                            <hr/>
                            {reply}
                       </div>
                                
                    )
               })
            }
        }
        var postinput=(
            <span className={classes.postarea}>
                   <input onChange={this.onInpuChangeHandler} className={classes.postComment} value={`${this.state.content}`} placeholder='Post Comment' /> 
                   <a href='#_' onClick={this.onPostHandler} className={classes.postbutton} > Post <i className="fa fa-chevron-right" aria-hidden="true"></i></a>     
            </span>
            
        )

        if(this.state.reply){
            postinput=(
                <span className={classes.postarea}>
                       <input  onChange={this.onInpuChangeHandler} className={classes.postComment} value={`${this.state.content}`} placeholder={`@`+this.state.username} /> 
                       <a href='#_' onClick={this.onReplyHandler} className={classes.postbutton} > Post <i className="fa fa-chevron-right" aria-hidden="true"></i></a>     
                       <a href='#_' onClick={this.onRemoveReply} className={classes.postbutton} >Cancel <i className="fa fa-times" aria-hidden="true"></i></a>     
                
                </span>
                
            )
        }
        
        if(!localStorage.getItem('token')){
            postinput = (
            <div className={classes.warning}> 
                <Link onClick={this.onRedirectHandler} to='/Auth' >You have to be logged in to post comments!!</Link>
            </div>)
        }

        if(this.props.post){
            var authorname1 = this.props.post.writer
            var authorname2 = localStorage.getItem('author')
            if(localStorage.getItem('author') && authorname2 === `${authorname1}`){
                edit=(<p className={classes.edit} onClick={this.onEditHandler} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit </p>) 
            }
            
        }

        if(this.state.message){
            message=(
            <Message
                show={this.state.show}
                hide={this.onHide}
                content={this.state.message}
                error={this.state.error}
            />)
        }

        return(
            <div>
                {message}
                <div className={classes.postdetailContainer}>
                <img className={classes.preview} src={cover_image} alt="CoverImage"/>     
               {content}
               <div className={classes.displayBlock} >
                    <p className={classes.date}>Published on - {d}</p>
                    {author}
                    
                        <a href='#_' className={classes.author} onClick={this.onSavePostHandler} ><i className="fa fa-bookmark-o" aria-hidden="true"></i> save   </a>
                        
                        <a href='#_' className={classes.author}  onClick={()=>this.onLikedPostHandler(upvotes)} ><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {upvotes}   </a>
                    
               </div> 
               {edit}
               <div className={classes.postdetailWrapper} >
                    {node}
                    <br/>
                    {rederict}
                    <br/><br/><br/>
                    <h1>Comments</h1>
               
               </div> 
               
               <div className={classes.comments}>
                    {comments}
                    <br/>
                    {postinput}
               </div>
               <br/><br/><br/><br/>  
               
            </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        post:state.post.postDetail,
        comments:state.post.comments,
        upvotes:state.post.upvotes,
        loading:state.post.loading,
        series_posts:state.series.series_posts,
        path:state.user.path
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onSetPostDetail:(id)=>dispatch(PostActions.setPostDetail(id)),
        onSetComments:(id)=>dispatch(PostActions.initComments(id)),
        onPostComment:(post, content, parent, owner)=>dispatch(PostActions.postComment(post,content,parent,owner)),
        onSavePost:(user, post)=>dispatch(UserActions.savePost(user, post)),
        onUpvotePost:(user, post, upvotes)=>dispatch(PostActions.upvotePost(user, post, upvotes)),
        onRedirect:path=>dispatch(UserActions.redirect(path))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);