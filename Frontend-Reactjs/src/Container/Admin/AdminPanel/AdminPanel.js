import React, {Component} from 'react'
import classes from './AdminPanel.module.css'
import Card from '../../../Component/HomePage/Card/Card'
import { connect} from 'react-redux'
import ReactHtmlParser from 'react-html-parser';

import * as PostActions from '../../../Store/Action/Posts'
import {Link} from 'react-router-dom'

class AdminPanel extends Component{
    componentDidMount(){
        if(localStorage.getItem('author')){
            const id = localStorage.getItem('author')
            this.props.onSetDrafts(id)
        }
        
    }

    onPublish=(id)=>{
        var currentdate = new Date(); 
        var datetime =  currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                +  currentdate.getDate()+ "T"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+ "Z"; 
        var authData={
            "published_date":datetime
        }                   
        this.props.onPublish(id,authData )      

    }

    render(){
        
        var node=null;
        var head=null
        var drafts= (<h1 className={classes.warning}>404 Not Found!</h1>);
        
        if(localStorage.getItem('is_staff')==="true"){
            if(localStorage.getItem('author')){
                if(!this.props.loading){
                    if(this.props.drafts){
                        head=(
                            <header className={classes.postcontainer}>
                       <p className={classes.posthead3}><Link to='/Admin/Post' ><i className="fa fa-plus" aria-hidden="true"></i>Post</Link></p>
                       <p className={classes.posthead3}><Link to='/Admin/addSeries' ><i className="fa fa-plus" aria-hidden="true"></i>Series</Link></p>
                       <p className={classes.posthead3}><Link to='/Admin/Image' ><i className="fa fa-plus" aria-hidden="true"></i>Image</Link></p>
                       <p className={classes.posthead}>Drafts</p>
                       {localStorage.getItem('token')?(<p className={classes.posthead2} >Welcome, {localStorage.getItem('username')}</p>):(<p className={classes.posthead2} ><Link to='/Auth' >Login/Singnup</Link></p>)}
                        </header>
                        )
                        drafts = this.props.drafts.map(post=>{
                            node = ReactHtmlParser(post.markdown)  
                            var d = new Date(post.saved_date),
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
                                      draft={true}
                                      image={post.cover_image}
                                      publish={()=>this.onPublish(post.pk)}  />
                            )
                        })
                    }
                }
            }
        }

        return(
           <div>
               {head }
                <div className={classes.wraper}>            
                      {drafts}              
                </div>
           </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        drafts:state.post.drafts,
        loading:state.post.loading,
        date:state.post.date
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onSetDrafts: id=>dispatch(PostActions.initDrafts(id)),
        onPublish:(id,date)=>dispatch(PostActions.onPublish(id, date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)