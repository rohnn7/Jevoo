import React from 'react'
import classes from './Card.module.css'
import TextEllipsis from 'react-text-ellipsis';
import {Link} from 'react-router-dom'

const Card = props=>{

    var serverSearch= props.image.search('http://127.0.0.1:8000')
    var server='http://127.0.0.1:8000'
    var image=props.image
    if(serverSearch<0){
        image= server + props.image
    }
    return(
        <div className={classes.card}>
            
                <img src={image }className={classes.cardimg} alt='CoverImage' />
            
            <div className={classes.cardtitle}>
                {props.title}
            </div>
            <div className={classes.cardpara}>
                <TextEllipsis
                  lines={4} 
                  tag={'div'} 
                  ellipsisChars={'...'}                  
                  >
                     {props.content}
                </TextEllipsis>
                
            </div>
            <div className={classes.cardbtngroup}>
                <button className={classes.cardbtn} ><Link className={classes.linkText} to={`/Post/${props.id}`}>view</Link></button>
                {props.draft?<button onClick={props.publish} className={classes.cardbtn} >publish</button>: <button className={classes.cardbtn} onClick={props.save} >save</button> }
            </div>
            <div className={classes.cardfooter}>
        
                {props.draft?(<p>Saved On-{props.date}</p>): (<p>Published On-{props.date}</p>) }
            </div>
        </div>
    )
}

export default Card;