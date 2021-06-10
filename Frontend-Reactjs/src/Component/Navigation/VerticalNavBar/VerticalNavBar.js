import React from 'react'
import classes from './VerticalNavBar.module.css'
import {HashLink as Link} from 'react-router-hash-link'

const verticalNavBar = (props)=>{

    var divStyle = {
        color: 'white',
        
      };
    return(
        <nav className={classes.verticalnavbar}>
                    <ul className={classes.verticalnavbaritems}>
                        <Link onClick={()=>{props.home(); props.modalClosed()}} className={`${classes.verticalnavbaritem} ${classes.circleScaleBtn} `} to="#home" smooth><p  style={divStyle}>Home</p></Link>
                        <Link onClick={()=>{props.about(); props.modalClosed()}} className={`${classes.verticalnavbaritem} ${classes.circleScaleBtn}`} to="#about" smooth><p  style={divStyle}>About</p></Link>
                        <Link onClick={()=>{props.posts(); props.modalClosed()}} className={`${classes.verticalnavbaritem} ${classes.circleScaleBtn}`} to="#posts" smooth><p  style={divStyle}> Posts</p></Link>
                        <Link onClick={()=>{props.series(); props.modalClosed()}} className={`${classes.verticalnavbaritem} ${classes.circleScaleBtn}`} to="#series" smooth><p  style={divStyle}> Series</p></Link>
                        <li onClick={()=>{props.user(); props.modalClosed()}} className={`${classes.verticalnavbaritem} ${classes.icon} `}><a href='#home' style={divStyle}><i className="fa fa-user-circle"  aria-hidden="true"></i> </a></li>
                   </ul>
        </nav>
    )
}

export default verticalNavBar;