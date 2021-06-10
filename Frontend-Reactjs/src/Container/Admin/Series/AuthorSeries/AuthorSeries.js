import React, {Component} from 'react'
import classes from './AuthorSeries.module.css'
import Card from '../../../../Component/Series/Card/Card'
import { connect} from 'react-redux'
import * as SeriesActions from '../../../../Store/Action/Series'
import ReactHtmlParser  from 'react-html-parser';
import {Link} from 'react-router-dom'

class AuthorSeries extends Component{
    componentDidMount(){
        if(localStorage.getItem('is_staff')&&localStorage.getItem('is_staff')==='true'){
            if(localStorage.getItem('author')){
                var author = localStorage.getItem('author')
                this.props.onSetAuthorSeries(author)
            }
        }
    }

    render(){
        var node;
        var head=null;
        
        var serieses=(<h1 className={classes.warning}>404 Not Found!</h1>)
        if(localStorage.getItem('is_staff')&&localStorage.getItem('is_staff')==='true'){
            if(localStorage.getItem('author')){
                head=(
                    <header className={classes.postcontainer}>
                   <p className={classes.posthead3}><Link to='/Admin/addSeries' ><i className="fa fa-arrow-left" aria-hidden="true"></i></Link></p>
                   <p className={classes.posthead}>Choose Series</p>
                   {localStorage.getItem('token')?(<p className={classes.posthead2} >Welcome, {localStorage.getItem('username')}</p>):(<p className={classes.posthead2} ><Link to='/Auth' >Login/Singnup</Link></p>)}
                </header> 
                )
                if(!this.props.loading){
                    if(this.props.serieses){

                        serieses = this.props.serieses.map(series=>{
                            node = ReactHtmlParser(series.description)  
                                 
                                          
                            return(
                                <Card className={classes.item}
                                      key={series.pk}
                                      id={series.pk}
                                      title={series.series_title}
                                      author={series.authorname} 
                                      image={series.series_image}
                                      content={node}  />
                            )
                        })
                    }
                }
            }
        }
        

        return(
           <div>
               {head}
                <div className={classes.wraper}>                
                      {serieses}              
                </div>
                
           </div>
        )
    }

}

const mapStateToProps=state=>{
    return{
       serieses: state.series.author_serieses,
       loading:state.series.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onSetAuthorSeries: id=>dispatch(SeriesActions.initAuthorSerieses(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSeries);