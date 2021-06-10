import React, {Component} from 'react'
import classes from './Authentication.module.css'
import * as PostActions from '../../Store/Action/User'
import { connect} from 'react-redux'
import Message from '../../Component/UI/Message/Message'

class Authentication extends Component{
    state={
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        password:'', 
        login:true, 
        hasAuth: false,
        error:'',
        show:true,
        message:false

    }

    componentDidUpdate(){
        if(this.props.user ){
            this.onRedirectHandler()
        }else if(this.props.user_register){
            this.onRedirectHandler()
            
        }
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

    onLoginHandler = (e)=>{
        e.preventDefault()
        
        if(this.state.username){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(this.state.username)){
                this.setState({
                    error:'Please enter a valid email address',
                    message:true,
                    show:true
                })
                

            }else{
                if(this.state.username && this.state.password){
                    this.props.onLogin(this.state.username, this.state.password)
                    this.setState({
                        username:'',
                        password:'',
                        show:true
                    })
                    
                }
            }
        }
        
    }

    onLoginSwitchhandler = ()=>{
        this.setState({
            login:true
        })
    }
    onRegisterSwitchhandler = ()=>{
        this.setState({
            login:false
        })
    }

    onRegisterHandler = (e)=>{
        e.preventDefault()

        if(this.state.email){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)){
                this.setState({
                    error:'Please enter a valid email address',
                    message:true,
                    show:true
                })
            }else{
                if(this.state.username && this.state.password && this.state.firstname && this.state.lastname && this.state.email){
                    this.props.onRegister(this.state.firstname, this.state.lastname, this.state.email, this.state.username, this.state.password)
                    this.setState({
                        firstname:'',
                        lastname:'',
                        email:'',
                        username:'',
                        password:'',
                        show:true
                    })
                }
            }
        }
        
        
    }


    onRedirectHandler = ()=>{
        if(localStorage.getItem('pk')){
            if(this.props.path){
                var path = this.props.path
                this.props.onRedirect(null)
                this.props.history.push(path)
            }else{
                this.props.history.push('/')
            }
        }
        
    }

    onHideMessage = ()=>{
        this.setState({
            show:false
        })
    }

    render(){
        var message=null;

        var label=(
            <form className={classes.form}>
            <p className={classes.formheading} >Please Login!!</p>
                <input ref='email' className={classes.label}  onChange={(event)=>{this.onInputChangeHandler(event, 'username')}} value={this.state.username} placeholder='Enter Email' />
                <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'password')}} value={this.state.password} placeholder='Enter Password' />
                <a href='#register' onClick={this.onRegisterSwitchhandler} className={classes.link}>create an account !!</a><br/>
                <button className={classes.submit} onClick={this.onLoginHandler} >submit</button>
            </form> 
        )
        if(!this.state.login){
            label=(
                <form className={classes.form}>
                     <p className={classes.formheading} >Please Register!!</p>
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'firstname')}} value={this.state.firstname} placeholder='Enter Firsname' />
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'lastname')}} value={this.state.lastname} placeholder='Enter Lastname' />
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'email')}} value={this.state.email} placeholder='Enter Email' />
                     <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'username')}} value={this.state.username} placeholder='Enter Username' />
                    <input className={classes.label} onChange={(event)=>{this.onInputChangeHandler(event, 'password')}} value={this.state.password} placeholder='Enter Password' />
                    <a href='#login' onClick={this.s=this.onLoginSwitchhandler} className={classes.link}>already have account?</a><br/>
                   <button className={classes.submit} onClick={this.onRegisterHandler} >submit</button>
            </form>
            )
        }

        if(this.props.registermessage){
            if(typeof this.props.registermessage === 'string'){
                message=(<Message  
                    show={this.state.show}
                    hide={this.onHideMessage}
                    content={this.props.registermessage}
                    error={true}
                />)

            }else if(this.props.registermessage.username[0]){
                message=(<Message  
                    show={this.state.show}
                    hide={this.onHideMessage}
                    content={this.props.registermessage.username[0]}
                    error={true}
                />)
            }
            
        }

        if(this.state.message){
            message=(<Message  
                show={this.state.show}
                hide={this.onHideMessage}
                content={this.state.error}
                error={true}
            />)
        }

        if(this.props.loginmessage){
            message=(<Message  
                show={this.state.show}
                hide={this.onHideMessage}
                content={this.props.loginmessage}
                error={true}
            />)
        }
        

        return(
            <div>
                {message}
                <div className={classes.formcontainer}>
                    {label}                
                </div>
            </div>
            
        )
    }
}


const mapStateToProps=state=>{
    return{
        user:state.user.user,
        user_register:state.user.user_register,
        loginmessage:state.user.loginMessage,
        registermessage:state.user.registermessage,
        loading:state.user.loading,
        path:state.user.path
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onLogin:(username, password)=>dispatch(PostActions.Login(username, password)),
        onRegister:(firstname, lastname, email, username, password)=>dispatch(PostActions.Register(firstname, lastname, email, username, password)),
        onRedirect:(path)=>dispatch(PostActions.redirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);