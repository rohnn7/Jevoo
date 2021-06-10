import React, { Component } from 'react';
import classes from './NavBar.module.css';
import 'font-awesome/css/font-awesome.min.css';
import Modal from '../../Component/UI/Modal/Modal'
import VerticalNavBar from '../../Component/Navigation/VerticalNavBar/VerticalNavBar'
// import { Link, animateScroll as scroll } from "react-scroll";
import {HashLink as Links} from 'react-router-hash-link'
import UserNavbar from '../../Component/Navigation/UserNavBar/UserNavBar';
import { Link } from 'react-router-dom'

class NavBar extends Component{

    state={
        showVerticalNavBar: false,
        home:true,
        about:false,
        posts:false,
        series:false,
        user:false,
        initial:true
    }

    onMenuClickedHandler = () => {
        this.setState({
            showVerticalNavBar:true
        })
    }

    onModalClosedHandler = ()=>{
        this.setState({
            showVerticalNavBar:false
        })
    }

    

    onHomeHandler=()=>{
        this.setState({
            home:true,
            about:false,
            posts:false,
            series:false,
            user:false
        })
    }
    onAboutHandler=()=>{
        this.setState({
            home:false,
            about:true,
            posts:false,
            series:false,
            user:false
        })
    }

    onPostsHandler=()=>{
        this.setState({
            home:false,
            about:false,
            posts:true,
            series:false,
            user:false
        })
    }

    onSeriesHandler=()=>{
        this.setState({
            home:false,
            about:false,
            posts:false,
            series:true,
            user:false
        })
    }

    onUserHandler=()=>{
        this.setState({
            home:false,
            about:false,
            posts:false,
            series:false,
            user:true,
            initial:false
        })
    }

    onCollapseHandler=()=>{
        this.setState({
            user:false,
            home:true,
        })
    }

    render(){

        var classnames = '';
        if(this.state.home){
            classnames=`${classes.navigation}`
        }else if(this.state.about){
            classnames=`${classes.navigation} ${classes.about}`
        }else if(this.state.posts){
            classnames=`${classes.navigation} ${classes.posts}`
        }else if(this.state.series){
            classnames=`${classes.navigation} ${classes.series}`
        }else{
            classnames=`${classes.navigation}` 
        }

        let username = ''
        if(localStorage.getItem('username')){
            username=localStorage.getItem('username')
        }

        var navbar = (
            <div>
                <div className={classes.logo}>
                    <a href='#home'>
                         
                    </a>
                </div>
                <div  className={classes.logo}>
                    Jevoo
                </div>
                <div className={classes.navbar}>
                    <div className={classes.navbaritems}>
                        <Links onClick={this.onHomeHandler} className={`${classes.navbaritem} ${classes.circleScaleBtn} `} to="#home" smooth><p  className={`${this.state.home? classes.active:''}`}>Home</p></Links>
                        <Links onClick={this.onAboutHandler} className={`${classes.navbaritem} ${classes.circleScaleBtn}`} to="#about" smooth><p  className={`${this.state.about? classes.active:''}`}>About</p></Links>
                        <Links onClick={this.onPostsHandler} className={`${classes.navbaritem} ${classes.circleScaleBtn}`} to="#posts" smooth><p  className={`${this.state.posts? classes.active:''}`}>Blogs</p></Links>
                        <Links onClick={this.onSeriesHandler} className={`${classes.navbaritem} ${classes.circleScaleBtn}`} to="#series" smooth><p  className={`${this.state.series? classes.active:''}`}>Series </p></Links>
                        {localStorage.getItem('pk')? <li className={`${classes.navbaritem} ${classes.icon} `}><Link className={`${this.state.user? classes.active:''}`} to = '/Account' ><i className="fa fa-user-circle"  aria-hidden="true"></i>  {username} </Link></li>:null}
                    </div>
                </div>
                <nav className={classes.navbar1}>
                    <ul className={classes.navbaritems}>                    
                        <li onClick={this.onMenuClickedHandler} className={`${classes.navbaritem} ${classes.menu} `}><a href='#home' className={`${classes.bar}`}><i className={`fa fa-bars `} aria-hidden="true"></i> </a></li>
                    </ul>
                </nav>
            </div>
        )

        return(
            <div className="wrapper">
                <Modal show={this.state.showVerticalNavBar} modalClosed={this.onModalClosedHandler}>
                    <VerticalNavBar slant={this.props.slant} 
                                    home={this.onHomeHandler}
                                    about={this.onAboutHandler}
                                    posts={this.onPostsHandler}
                                    series={this.onSeriesHandler}
                                    user={this.onUserHandler}
                                    modalClosed={this.onModalClosedHandler} />
                </Modal> 
                <section className={classnames}>  
                                             
                {navbar}
            </section>
            
            <UserNavbar collapse={this.onCollapseHandler} show={this.state.user} initial={this.state.initial} />
            </div>
            
        )
    }
    
}

export default NavBar; 