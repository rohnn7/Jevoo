import React from 'react'
import classes from './Message.module.css'

const Message = props=>{
    

    return(
        <div className={`${ props.error?classes.messageContainerred: classes.messageContainergreen} ${props.show?classes.animationshow:classes.animationhide}`} >
            <div className={classes.message} >
                <p className={ props.error?classes.messagetextred: classes.messagetextgreen}  >{props.content}</p>
                <div  onClick={props.hide} className={props.error?classes.messageiconred:  classes.messageicongreen} > <i  className="fa fa-times" aria-hidden="true"></i></div>
            </div>
        </div>
    )

}

export default Message;