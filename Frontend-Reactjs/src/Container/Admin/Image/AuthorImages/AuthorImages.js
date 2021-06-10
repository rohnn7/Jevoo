import React, {Component} from 'react'
import classes from './AuthorImages.module.css'
import { connect} from 'react-redux'
import * as ImageActions from '../../../../Store/Action/Image'
import ImageCard from '../../../../Component/Image/ImageCard'


class AuthorImages extends Component{

    componentDidMount(){
        if(localStorage.getItem('author')){
            this.props.onImageListHandler(localStorage.getItem('author'))
        }
    }

    render(){
        var content=(<p className={classes.warning}>404 Not Found!</p>)

        if(localStorage.getItem('author')){
            if(this.props.images){
                content= this.props.images.map(image=>{
                    return(
                        
                            <ImageCard url={image.image}/>
                        
                        
                    )
                })
            }
        }

        return(
            <div className={classes.imageList} >
                <p className={classes.warning}>Choose Image by Copying URL</p>
                <div className={classes.imageListContainer}>
                    {content}
                </div>
            </div>
        )
    }

}

const mapStateToProps=state=>{
    return{
        images:state.image.images,
        loading:state.image.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onImageListHandler:id=>dispatch(ImageActions.getImages(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthorImages);