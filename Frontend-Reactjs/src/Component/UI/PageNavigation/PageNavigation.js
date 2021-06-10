import React from 'react'
import classes from './PageNavigation.module.css'
import { Link } from 'react-router-dom'

const PageNavigation=props=>{

    return(
        <div className={classes.pageNavigation} >
            {props.firstpk===props.postpk?null: <Link to={`/Post/${props.prev}`} ><div className={classes.onNavigation}  ><i className="fa fa-arrow-left" aria-hidden="true"></i>Prev</div></Link>}
            {props.lastpk===props.postpk?null: <Link to={`/Post/${props.next}`} ><div className={classes.onNavigation} >Next<i className="fa fa-arrow-right" aria-hidden="true"></i></div></Link>}
        </div>
    )
}

export default PageNavigation