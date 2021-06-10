import React, {Component} from 'react'
import classes from './Image.module.css'
import { connect} from 'react-redux'
import * as ImageActions from '../../../Store/Action/Image'


class Image extends Component {
 
    state={
        image_preview:null,
        image:null
    }

    onInputChangeHandler=(e)=>{
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image = e.target.files[0]
        this.setState({
            image:image,
            image_preview:image_as_base64
        })
    }

    onSubmitHandler=()=>{
        var author = 1
       if(localStorage.getItem('author')){
            author=localStorage.getItem('author')
       }
       if(this.state.image){
           let formData = new FormData()
           formData.append('image', this.state.image)
           formData.append('author', author )
           console.log(formData)
           this.props.onImageUploadHandler(formData)
       }
    }

    render(){
        var content = (<h1 className={classes.warning}>404 Not Found!</h1>)
        if(localStorage.getItem('is_staff')){
            var flag = localStorage.getItem('is_staff')
            
            if(flag&& flag==="true" && localStorage.getItem('author')){
                content=(
                    <div className={classes.AdminContainer}>
                        <p className={classes.imageHeader}>Upload Image</p>
                        {this.state.image_preview?<img className={classes.preview} src={this.state.image_preview} alt="AuthorImage"/>:null}
                        <br/>
                        <input className={classes.label} type="file"  onChange={(event)=>{this.onInputChangeHandler(event)}} placeholder='Enter AuthorName' />
                        <button className={classes.submit} onClick={this.onSubmitHandler} >Upload</button>
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
        images:state.image.response
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onImageUploadHandler:authData=>dispatch(ImageActions.initImages(authData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Image);