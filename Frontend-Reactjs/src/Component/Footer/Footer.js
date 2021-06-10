import React from 'react'
import classes from './Footer.module.css'
import {Link} from 'react-router-dom'

const Footer = props=>{
    return(
       <div>
           <div className={classes.socialHandle}>
                <div  className={classes.icon} ><i className="fa fa-instagram" aria-hidden='true' ></i></div>
                <div  className={classes.icon} ><i className="fa fa-facebook-f" aria-hidden='true' ></i></div>
                <div  className={classes.icon} ><i className="fa fa-linkedin" aria-hidden='true'></i></div>
                <div  className={classes.icon} ><i className="fa fa-github" aria-hidden="true"></i></div>
                <div  className={classes.icon} ><i className="fa fa-youtube-play" aria-hidden='true'></i></div>
           </div>
           <div className={classes.footerContainer} >
                <div className={classes.aboutColumn}>
                    <p className={classes.footerHeading} >News</p>
                    <p className={classes.about} > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className={classes.linksColumn}>
                    <p className={classes.footerHeading} > Links</p>
                    <Link to='/Posts' className={classes.link} >Blogs <i className="fa fa-arrow-right" aria-hidden='true'></i> </Link>
                    <Link to='/Series' className={classes.link} >Series <i className="fa fa-arrow-right" aria-hidden='true'></i></Link>
                    <Link to='/' className={classes.link} >Terms <i className="fa fa-arrow-right" aria-hidden='true'></i></Link>
                    {localStorage.getItem('pk')? <Link to='/Account' className={classes.link}>Saved Blogs <i className="fa fa-arrow-right" aria-hidden='true'></i></Link> :<Link to='/Auth' className={classes.link} >Login <i className="fa fa-arrow-right" aria-hidden='true'></i></Link>}
                    {localStorage.getItem('pk')? <Link to='/Account' className={classes.link} >Liked Blogs <i className="fa fa-arrow-right" aria-hidden='true'></i></Link> :null}
                </div>
                <div className={classes.teamColumn} >
                    <p className={classes.footerHeading} >Team</p>
                    <p className={classes.footer} >Rohan Verma </p>
                    <p className={classes.footer} >Aman Verma </p>
                </div>
                <div className={classes.contactColumn} >
                    <p className={classes.footerHeading} >Contact Us</p>
                    <input className={classes.input} placeholder='Your Email' />
                    <textarea className={classes.input} placeholder='Your Message' />
                    <button className={classes.cardbtn} >Contact</button>
                    <p className={classes.contact} >Contact info:</p>
                    <p className={classes.contact} >Email: vrohanrv7@gmail.com, Contact number: +91 8982021300, Dicord Server: Some link.
                        <br/>Contact us to join our telegram channel also!
                     </p>
                    
                         
                </div>
                <p className={classes.copyright} > Copyright <i className="fa fa-copyright" aria-hidden="true"></i> <b>Jevoo</b>. All rights reserved </p>
           </div>
         </div>
    )
}

export default Footer;