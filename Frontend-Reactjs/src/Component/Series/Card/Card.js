import React from 'react'
import classes from './Card.module.css'
import TextEllipsis from 'react-text-ellipsis';
import {Link} from 'react-router-dom'

const Card = props=>{
    
    return(
        <div className={classes.card}>

                <img src={props.image }className={classes.cardimg} alt='priview' />
            
            <div className={classes.cardtitle}>
                {props.title}
            </div>
            <div className={classes.cardpara}>
                <TextEllipsis
                  lines={4} 
                  tag={'div'} 
                  ellipsisChars={'...'}>
                     {props.content}
                </TextEllipsis>
                
            </div>
            <div className={classes.cardbtngroup}>
                <button className={classes.cardbtn} ><Link className={classes.linkText}  to={`/Series/${props.id}`}>view</Link></button>
                
            </div>
            <div className={classes.cardfooter}>
        
                Published By - {props.author}
            </div>
        </div>
    )
}

export default Card;