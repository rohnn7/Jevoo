import React from 'react'
import classes from './PageBullet.module.css'

const PageBullet=props=>{
    var cssclass=`${classes.bullet}`
    if(props.active){
        cssclass=`${classes.bullet} ${classes.active}`
    }

    
    return(
        <div className={cssclass } onClick={()=>props.redirect(props.page)} >
            <div className={classes.number} >
                {props.page}
            </div>
        </div>
    )
}

export default PageBullet;