import React from 'react'
import classes from './ImageCard.module.css'
import {Link} from 'react-router-dom'

const ImageCard=props=>{
    return(
        <div className={classes.ImageCard} >
            <Link to='/Admin/Post' >
                <img className={classes.preview} src={props.url} alt="preview"/>
            </Link>
            
            <p className={classes.url}>{props.url}</p>
        </div>
    )
}

export default ImageCard