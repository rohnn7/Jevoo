import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './HomePage.module.css'
import NavBar from '../Navigation/Navbar'
import LandingPage from '../../Component/HomePage/LandingPage/LandingPage';
import Posts from '../Posts/Posts'
import Series from '../Series/Series'
import {Link} from 'react-router-dom' 
import About from '../../Component/HomePage/About/About'
import Footer from '../../Component/Footer/Footer'
import * as PostActions from '../../Store/Action/Posts'
import { connect} from 'react-redux'


class HomePage extends Component{
    state={
      slantNavigation:false,
      search:null
    }
  
    onSlantHandler = ()=>{
      this.setState({
        slantNavigation:true
      })
    }
  
    onHideHandler = ()=>{
      this.setState({
        slantNavigation:false
      })
    }

    onChangeHandler=(event)=>{
      this.setState({
        search:event.target.value
      })
    }

    onSearch=()=>{
      if(this.state.search){
        var authdata={
          'search':this.state.search
        }
        this.props.onSearch(authdata)
        this.props.history.push('/Search/Results')
      }
    }
    
    

    render(){
      return(
        <div className={classes.container} >
          <header className={classes.myNavbar}>
             <NavBar slant={this.onSlantHandler}/>
          </header>
          
            <br/>
            <LandingPage
              value={this.state.search}
              change={this.onChangeHandler}
              search={this.onSearch}
            />
            <br/><br/><br/><br/><br/><br/><br/>
            <p className={classes.heading} id='about'> About :  </p>
            <About/>
            <br/><br/>
            <p className={classes.heading} id='posts'><Link to='/Posts'>Blogs  <i className="fa fa-arrow-right" aria-hidden="true"></i></Link></p>
            <Posts/>

            <br/>

            <p className={classes.heading} id='series'><Link to='/Serieses'>Series  <i className="fa fa-arrow-right" aria-hidden="true"></i></Link></p>           
            <Series/>
            <br/><br/>
            <Footer/>
            
            
            
        </div>
      )
    }
  }
  const mapStateToProps=state=>{
    return{
        posts:state.post.searchPosts,
        loading:state.post.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
       onSearch:authdata=>dispatch(PostActions.searchPost(authdata))
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)( HomePage);