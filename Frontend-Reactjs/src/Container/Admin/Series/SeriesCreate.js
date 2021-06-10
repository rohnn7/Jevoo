import React, { Component} from 'react'
import classes from './SeriesCreate.module.css'
import { connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as SeriesActions from '../../../Store/Action/Series'

class SeriesCreate extends Component{

    state={
        title:'',
        description:'',
        image:null

    }

    onInputHandler=(e,field)=>{
        if(field==='title'){
            this.setState({
                title:e.target.value
            })
        }
        if(field==='description'){
            this.setState({
                description:e.target.value
            })
        }
        if(field==='image'){
            let image = e.target.files[0]
            this.setState({
                image:image,
            })
        }
    }

    onSubmitHandler=()=>{
        var author=null;
        if(localStorage.getItem('author')){
            author=localStorage.getItem('author')
            var seriesimage=new FormData()
            seriesimage.append('series_image', this.state.image)
            this.props.onCreateSeries(this.state.title, this.state.description, author, seriesimage)
        }
        this.setState({
            title:'',
            description:''
        })
        this.props.history.push('/Admin/chooseSeries')
    }

    render(){
        var content= (<h1 className={classes.warning}>404 Not Found!</h1>)
        if(localStorage.getItem('is_staff')==="true"){
            if(localStorage.getItem('author')){
                content=(
                    <div >
                <header className={classes.formHeader}>
                    <p className={classes.headText}>Add Post to Series</p>
                </header>
                <br/>
                <div className={classes.formContent} >
                    <p className={classes.choice1} ><Link to={'/Admin/chooseSeries'}>Add a Post to Existing Series</Link></p>
                    <br/>
                    <p className={classes.divergence}>----------- OR ------------</p>
                    
                    <p className={classes.choice2} > Create a New Series and then add a Post to it </p>
                    <div className={classes.seriesForm} >
                        <input className={classes.titleInput} onChange={(event)=>{this.onInputHandler(event, 'title')}} value={this.state.title} placeholder={'Enter the title of Series'} />
                        <textarea className={classes.descriptionInput} onChange={(event)=>{this.onInputHandler(event, 'description')}}  value={this.state.description} placeholder={'Enter a Description for Series'} />
                        <input className={classes.label} type="file"  onChange={(event)=>{this.onInputHandler(event, 'image')}} placeholder='Enter Cover Image' />
                        <button className={classes.submit} onClick={this.onSubmitHandler} >create</button>
                    </div>
                </div>
            </div>
                )
            }
        }
        return(
            <div className={classes.formContainer} >
                {content}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        newSeries:state.series.response
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onCreateSeries:(title, description, author, seriesimage)=>dispatch(SeriesActions.uploadSeries(title, description, author, seriesimage))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SeriesCreate)