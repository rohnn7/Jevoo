import React from 'react'
import classes from './Comment.module.css'

const Comment = props=>{
    var d = new Date(props.date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day; 
          
    d= [day, month,year ].join('/')  
                               

    return(
        <div className={classes.commentContainer}>
            
          <span className={classes.username}>@{props.username}</span><br/>
          <span className={classes.content}>{props.content}</span><br/>
          <span className={classes.date}>posted on- {d}</span>
          {localStorage.getItem('token')?<span><a href='#_' onClick={props.reply} className={classes.reply}>   reply</a></span>:null}
           <br/>
          
        </div>
    )
}

export default Comment;