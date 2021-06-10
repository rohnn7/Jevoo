import React, {Component} from 'react'
import classes from './PostCreate.module.css'
import * as PostActions from '../../../Store/Action/Posts'
import { connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@rohnn/ckeditor5-custom-build-classic-imageresize';

class PostEdit extends Component {

    state={
        markdown:'',
        initialContent:'',
        title:'wait till content is loading...',
        image:null,
        initialtitle:'',
        flag:0
    }

    componentWillMount(){
        if(localStorage.getItem('post')){
            this.props.onCompleted()
            this.props.onDetailHandler(localStorage.getItem('post'))
        }
    }

    componentDidUpdate(){
        if(this.props.completed===true){
             this.props.history.push(`/Admin/Panel`)
            
        }
    }

    componentDidMount(){
        if(this.props.post){
            
            this.setState({
                
                title:this.props.post.title,
                
            })
            console.log(this.props.post)
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

    onEditHandler=()=>{
        
        if(this.props.post){             

                var formData={
                    'title': this.state.title,
                    'markdown': this.state.markdown,
                    'series':this.props.post.series,
                    'is_series':this.props.post.is_series,
                    'writer':this.props.post.writer
                }
                var coverimage=new FormData()
                coverimage.append('cover_image', this.state.image)
                
                this.props.onEditHandler(formData, coverimage, localStorage.getItem('post'))
                localStorage.removeItem('post')
           
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
            
            this.props.onEditHandler(formData, coverimage, localStorage.getItem('post'))
            
        }
        
    }

    render(){
        
        var initialContent='<h1>wait till content is loading...</h1>'
        var coverimage=null
        if(this.props.post){
            
            initialContent=this.props.post.markdown
            coverimage=this.props.post.cover_image
        }

        var content=(<h1 className={classes.warning}>404 Not Found!</h1>)
        if(localStorage.getItem('is_staff')==='true'){
            if(localStorage.getItem('author')){
                content=(
                    <div>
                        <h1 className={classes.formTitle} >Post Edit</h1>
                        <input className={classes.titleInput} onChange={(event)=>{this.onInputHandler(event, 'title')}} value={this.state.title} placeholder={'Enter the title of Post'} />
                        <img className={classes.preview} src={coverimage} alt="preview"/>
                        <input className={classes.label} type="file"  onChange={(event)=>{this.onInputHandler(event, 'image')}} placeholder='Enter Cover Image' />
                        
                        <div className={classes.ckeditor} >
                        <CKEditor
                            editor={ ClassicEditor }
                    
                            data={initialContent}
                            onReady={ editor => {
                             // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ this.onInputChangeHandler }

                    
                    
                   
                        />
                        </div>
                
                        <button className={classes.submit} onClick={this.onEditHandler} >Edit</button>
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
        completed:state.post.completed,
        post:state.post.postDetail
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onEditHandler:(authData, coverimage, id)=>dispatch(PostActions.updatePost(authData,  coverimage, id)),
        onDetailHandler:id=>dispatch(PostActions.setPostDetail(id)),
        onCompleted:()=>dispatch(PostActions.isCompleted())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)