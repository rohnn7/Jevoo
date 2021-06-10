import React, {Component} from 'react'
import classes from './PostCreate.module.css'
import * as PostActions from '../../../Store/Action/Posts'
import { connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@rohnn/ckeditor5-custom-build-classic-imageresize';

class PostCreate extends Component {

    state={
        markdown:'',
        initialContent:'',
        title:'',
        image:null
    }

    componentWillMount(){
       
            this.props.onCompleted()
            
     
    }

    componentDidUpdate(){
        if(this.props.completed===true){
             this.props.history.push(`/Admin/Panel`)
            
        }
    }

    onInputChangeHandler=(event, editor)=>{
        this.setState({
            markdown:editor.getData()
        })
        
    }

    onInputHandler=(e, field)=>{
        if(field==='title'){
            this.setState({
                title:e.target.value
            })
        }
        if(field==='image'){
            let image = e.target.files[0]
            this.setState({
                image:image,
            })
        }
    }

    onAddHandler=()=>{
        var author = 1
        if(localStorage.getItem('author')){
            author=localStorage.getItem('author')
            // let formData = new FormData()
            // formData.append('title', this.state.title)
            // formData.append('markdown', `${this.state.markdown}`)
            // formData.append('cover_image', this.state.image)
            // formData.append('series', null)
            // formData.append('is_series', false)
            // formData.append('writer', author)
            if(localStorage.getItem('series')){
                var series = localStorage.getItem('series')

                var formData={
                    'title': this.state.title,
                    'markdown': this.state.markdown,
                    'series':series,
                    'is_series':true,
                    'writer':author
                }
                var coverimage=new FormData()
                coverimage.append('cover_image', this.state.image)
                
                this.props.onCreateHandler(formData, coverimage)
                localStorage.removeItem('series')
            }
        }

    }

    onSubmitHandler=()=>{
        var author = 1
      
        if(localStorage.getItem('author')){
            author=localStorage.getItem('author')
            // let formData = new FormData()
            // formData.append('title', this.state.title)
            // formData.append('markdown', `${this.state.markdown}`)
            // formData.append('cover_image', this.state.image)
            // formData.append('series', null)
            // formData.append('is_series', false)
            // formData.append('writer', author)
            var formData={
                'title': this.state.title,
                'markdown': this.state.markdown,
                'series':null,
                'is_series':false,
                'writer':author
            }
            var coverimage=new FormData()
            coverimage.append('cover_image', this.state.image)
            
            this.props.onCreateHandler(formData, coverimage)
            
        }
        
    }

    render(){
        var content=(<h1 className={classes.warning}>404 Not Found!</h1>)
        if(localStorage.getItem('is_staff')==='true'){
            if(localStorage.getItem('author')){
                content=(
                    <div>
                        <h1 className={classes.formTitle} >Post Create</h1>
                        <input className={classes.titleInput} onChange={(event)=>{this.onInputHandler(event, 'title')}} value={this.state.title} placeholder={'Enter the title of Post'} />
                        <input className={classes.label} type="file"  onChange={(event)=>{this.onInputHandler(event, 'image')}} placeholder='Enter Cover Image' />
                        <div className={classes.ckeditor} >
                        <CKEditor
                            editor={ ClassicEditor }
                    
                            data={this.state.initialContent}
                            onReady={ editor => {
                             // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ this.onInputChangeHandler }

                    
                    
                   
                        />
                        </div>
                
                        {localStorage.getItem('series')
                            ?(<button className={classes.submit} onClick={this.onAddHandler} >Add</button>)
                            :(<button className={classes.submit} onClick={this.onSubmitHandler} >create</button>)}
                        <Link to='/Admin/imagelist' ><button className={classes.submit} onClick={this.onImageHandler} >Images</button></Link>
                    </div>
                )
            }
        }

        return(
            <div className={classes.postForm}>
                {content}
            </div>
        )
    }

}

const mapStateToProps=state=>{
    return{
        newPost:state.post.responsePost,
        completed:state.post.completed
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onCreateHandler:(authData, coverimage)=>dispatch(PostActions.uploadPost(authData,  coverimage)),
        onCompleted:()=>dispatch(PostActions.isCompleted())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostCreate)