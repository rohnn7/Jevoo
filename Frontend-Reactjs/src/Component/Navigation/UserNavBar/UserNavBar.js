import React from 'react';
import classes from './UserNavBar.module.css';
import 'font-awesome/css/font-awesome.min.css';

const UserNavbar= props=>{

    var classnames=''
    if(props.show){
         classnames=classes.container
    }else if(props.show===false && props.initial===false){
         classnames=classes.content
    }

   return(
        <div>
            
        <div className={classnames}>
           
           <div className={classes.usernavigation}>
           
           <div className={classes.collapse}>
           <i onClick={props.collapse} className="fa fa-angle-right" aria-hidden="true"></i>
           </div>
           <div className={classes.user}>
                Welcome Back,<br/> User
           </div>

           <nav className={classes.usernavbar}>
                <ul className={classes.usernavbaritems}>
                    <li className={`${classes.usernavbaritem}`}><i className={`${classes.icon} fa fa-info`} aria-hidden="true"></i>  Profile</li>
                    <li className={`${classes.usernavbaritem}`}><i className={`${classes.icon} fa fa-bookmark`} aria-hidden="true"></i> Saved Posts</li>
                    <li className={`${classes.usernavbaritem}`}><i className={`${classes.icon} fa fa-newspaper-o`} aria-hidden="true"></i> New Posts</li>
                    <li className={`${classes.usernavbaritem}`}><i className={`${classes.icon} fa fa-sign-out`} aria-hidden="true"></i>  Logout</li>
                </ul>
           </nav>

          </div>
          
       </div>
       
        </div>
        
   )
}

export default UserNavbar;
