import React, {Component} from 'react'
import classes from './Account.module.css'
import Loader from '../../../Component/UI/Loader/Loader'
import * as PostActions from '../../../Store/Action/User'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom'
import HorizontalPostaCard from '../../../Component/Series/HorizontalPostCard/HorizontalPostCard'

class Account extends Component{
    componentDidMount(){
        if(localStorage.getItem('pk')){
            this.props.onSavePosts(localStorage.getItem('pk'))
            this.props.onUpVotedPosts(localStorage.getItem('pk'))
            this.props.onUserDetail(localStorage.getItem('pk'))
        }
        
    }


    state={
        savedposts:true,
        likedposts:false,
        profile:false,
        logout:false,
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        flag:0
    }

    onInputChangeHandler = (event, field)=>{
       
        if(field==='username'){
            this.setState({
                username:event.target.value
            }) 
        }
        
        if(field==='password'){
            this.setState({
                password:event.target.value
            })
        }
        if(field==='firstname'){
            this.setState({
                firstname:event.target.value
            }) 
        }
        if(field==='lastname'){
            this.setState({
                lastname:event.target.value
            }) 
        }
        if(field==='email'){
            this.setState({
                email:event.target.value
            }) 
        }
        
    }

    onSetHandler=()=>{
        this.setState({
            firstname:this.props.userdetail.first_name,
            lastname:this.props.userdetail.last_name,
            email:this.props.userdetail.email,
            username:this.props.userdetail.username,
        })
    }

    onChangeHandler=choice=>{
        if(choice==='savedpost'){
            this.setState({
                savedposts:true,
                likedposts:false,
                profile:false,
                logout:false
            })
        }else if(choice==='likedposts'){
            this.setState({
                likedposts:true,
                savedposts:false,
                profile:false,
                logout:false
            })
        }else if(choice==='profile'){
            this.setState({
                likedposts:false,
                savedposts:false,
                profile:true,
                logout:false
            })
            
                this.onSetHandler()
           
        }else if(choice==='logout'){
            this.setState({
                likedposts:false,
                savedposts:false,
                profile:false,
                logout:true
            })
        }
    }

    onUpdateHandler=()=>{
        var authData
        if(this.state.firstname!==''){
            authData={
                'first_name':this.state.firstname,
                'last_name':this.state.lastname,
                'email':this.state.email,
                'username':this.state.username

            }
            if(localStorage.getItem('pk')){
                this.props.onUserUpdate(localStorage.getItem('pk'),authData)
            }
        }
    }

    onLogoutHandler=()=>{
        if(localStorage.getItem('pk')){
            localStorage.removeItem('pk')
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('is_staff')
            if(localStorage.getItem('author')){
                localStorage.removeItem('author')
            }
            this.props.history.push('/')
        }
    }

    onRedirectHandler=()=>{
        this.props.onRedirect('/Account')
    }
    render(){
        var content=(<Loader/>)
        var savedpost=`${classes.menuItem}`
        var linkedpost=`${classes.menuItem}`
        var profile=`${classes.menuItem}`
        var logout=`${classes.menuItem}`
        if(this.state.savedposts){
            if(this.props.savedposts){
                content = this.props.savedposts.map(post=>{
                    return(
                        <Link key={post.post}  to={`/Post/${post.post}`} >
                            <HorizontalPostaCard
                                key={post.post}
                                title={post.savedpost[0].title}
                                markdown={post.savedpost[0].markdown}
                                image={post.savedpost[0].cover_image}
                            />
                        </Link>
                    )
                })
                savedpost=`${classes.menuItem}  ${classes.active}`
                linkedpost=`${classes.menuItem}`
                profile=`${classes.menuItem}`
                logout=`${classes.menuItem}`

            }
        }else if(this.state.likedposts){
            if(this.props.likedposts){
                content = this.props.likedposts.map(post=>{
                    return(
                        <Link key={post.post}  to={`/Post/${post.post}`} >
                            <HorizontalPostaCard
                                key={post.post}
                                title={post.likedpost[0].title}
                                markdown={post.likedpost[0].markdown}
                                image={post.likedpost[0].cover_image}
                            />
                        </Link>
                    )
                })
                savedpost=`${classes.menuItem}  `
                linkedpost=`${classes.menuItem} ${classes.active}`
                profile=`${classes.menuItem}`
                logout=`${classes.menuItem}`
            }
        }else if(this.state.logout){
            content=(
                <div className={classes.logout} >
                    <p className={classes.statement} >Are you sure, that you wanna logout?</p>
                    
                    <button className={classes.cardbtn} onClick={this.onLogoutHandler}>Logout</button>
                    
                </div>
            )
                savedpost=`${classes.menuItem}  `
                linkedpost=`${classes.menuItem}`
                profile=`${classes.menuItem}`
                logout=`${classes.menuItem} ${classes.active}`
        }else if(this.state.profile){
            if(this.props.userdetail){
                
                
                content=(
                    <form className={classes.form}>
                     <p className={classes.formheading} >User Profile!</p>
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'firstname')}} value={this.state.firstname} placeholder='Enter Firsname' />
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'lastname')}} value={this.state.lastname} placeholder='Enter Lastname' />
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'email')}} value={this.state.email} placeholder='Enter Email' />
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'username')}} value={this.state.username} placeholder='Enter Username' />
                    
                    
                   <button className={classes.submit} onClick={this.onUpdateHandler} >Change</button>
            </form>
                )
            }
            savedpost=`${classes.menuItem}  `
            linkedpost=`${classes.menuItem}`
            profile=`${classes.menuItem} ${classes.active}`
            logout=`${classes.menuItem} `
        }

        return(
            <div>
               <header className={classes.postcontainer}>
                   <p className={classes.posthead3}><Link to='/' ><i className="fa fa-arrow-left" aria-hidden="true"></i></Link></p>
                   <p className={classes.posthead}>User:</p>
                   {localStorage.getItem('token')?(<p className={classes.posthead2} > {localStorage.getItem('username')}</p>):(<p className={classes.posthead2} ><Link to='/Auth' onClick={this.onRedirectHandler} >Login/Singnup</Link></p>)}
                </header>
                <div className={classes.row} >
                    <div className={classes.menuColumn} >
                        <li className={profile } ><a href='#_' onClick={()=>this.onChangeHandler('profile')} >Profile</a> </li>
                        <li className={savedpost} ><a href='#_' onClick={()=>this.onChangeHandler('savedpost')} > Saved Posts</a> </li>
                        <li className={linkedpost} ><a href='#_' onClick={()=>this.onChangeHandler('likedposts')}> Liked Posts</a> </li>
                        <li className={logout} ><a href='#_' onClick={()=>this.onChangeHandler('logout')}> Logout</a> </li>
                    </div>
                    <div classsName={classes.contentColumn} >
                        <div className={classes.contentContainer} >
                            {content}
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        savedposts:state.user.savedPosts,
        likedposts:state.user.likedPosts,
        userdetail:state.user.userdetail
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onSavePosts:(user)=>dispatch(PostActions.initSavedPosts(user)),
        onUpVotedPosts:(user)=>dispatch(PostActions.initUpVotedPosts(user)),
        onUserDetail:(user)=>dispatch(PostActions.initUserDetails(user)),
        onUserUpdate:(user, authData)=>dispatch(PostActions.initUserResponse(user, authData)),
        onRedirect:path=>dispatch(PostActions.redirect(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);