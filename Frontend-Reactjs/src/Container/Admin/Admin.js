import React, {Component} from 'react'
import classes from './Admin.module.css'
import { connect} from 'react-redux'
import * as UserActions from '../../Store/Action/User'


class Admin extends Component {

    state={
        authorname:''
    }


    componentDidMount(){
        this.props.onSetAuthors()
    }

    

    onInputChangeHandler=(e)=>{
        this.setState({
            authorname:e.target.value
        })
    }

    onSubmitHandler=()=>{
        if(this.props.authors){
           const authorIndex= this.props.authors.findIndex(author=>author.penname === this.state.authorname )        
           const authorPk = this.props.authors[authorIndex].pk
           localStorage.setItem('author', authorPk)
           this.props.history.push('/Admin/Panel')
        }
    }

    render(){
        var content = (<h1 className={classes.warning}>404 Not Found!</h1>)
        if(localStorage.getItem('is_staff')){
            var flag = localStorage.getItem('is_staff')
            console.log(flag)
            if(flag&& flag==="true"){
                content=(
                    <div className={classes.AdminContainer}>
                        <input className={classes.label}  onChange={(event)=>{this.onInputChangeHandler(event)}} placeholder='Enter AuthorName' />
                        <button className={classes.submit} onClick={this.onSubmitHandler} >submit</button>
                    </div>
                )
            } 
            
        }

        return(
          <div className={classes.AdminPanel}>
              {content}
          </div>
                
        
        )
      }
}

const mapStateToProps=state=>{
    return{
        authors:state.user.authors
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onSetAuthors:()=>dispatch(UserActions.initAuthors())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);