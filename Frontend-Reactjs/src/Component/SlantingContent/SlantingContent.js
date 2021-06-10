import React from 'react'
import classes from './SlantingContent.module.scss'

const SlantingContent = (props)=>{
    return(
        <div className={`${classes.page} ${props.isSlant ? classes.shazam:''}`}>
            
            <ul className={`${classes.menu_items } ${props.isSlant ? classes.shazam:''}`}>
                <li><a href='#'><i className={`${classes.icon} fa fa-signal fa-2x`}></i> Moar</a></li>
                <li><a href='#'><i className={`${classes.icon}fa fa-coffee fa-2x`}></i> Coffee</a></li>
                <li><a href='#'><i className={`${classes.icon} fa fa-heart fa-2x`}></i> Please</a></li>
            </ul>
            <main onClick={props.hide} className={`${classes.content} `}>
                <div className={`${classes.content_inner}`}>
                    {props.children}
                </div>
            </main>
</div>
    )
}

export default SlantingContent;