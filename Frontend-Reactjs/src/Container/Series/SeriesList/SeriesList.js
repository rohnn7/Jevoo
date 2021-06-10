import React, {Component} from 'react'
import classes from './SeriesList.module.css'
import Card from '../../../Component/Series/Card/Card'
import { connect} from 'react-redux'
import * as PostActions from '../../../Store/Action/Series'
import * as UserActions from '../../../Store/Action/User'
import Loader from '../../../Component/UI/Loader/Loader'
import ReactHtmlParser from 'react-html-parser';
import {Link} from 'react-router-dom'
import PageBullet from '../../../Component/UI/PageBullet/PageBullet'
import Footer from '../../../Component/Footer/Footer'

class SeriesList extends Component{
    componentDidMount(){
        this.props.onInitSeries(1)
    }

    onRedirectHandler=()=>{
        this.props.onRedirect('/Serieses')
    }


    render(){
        var node;        
        var serieses=(<Loader className={classes.loader} />);
        var pages=null;
        var i;
        var page=1;
        var currentpage=1;
        var totalpages=1;
        if(!this.props.loading){
            if(this.props.serieses){
                serieses = this.props.serieses.results.map(series=>{
                    node = ReactHtmlParser(series.description)  
                         
                                  
                    return(
                        <Card className={classes.item}
                              key={series.pk}
                              id={series.pk}
                              title={series.series_title}
                              author={series.authorname} 
                              content={node}
                              image={series.series_image}  />
                    )
                })


            }

            for(i=0; i<this.props.serieses.total_pages;i++){
                if(page<=3){
                    pages=(
                        <>
                            {pages}
                            {this.props.serieses.page_number===page 
                            ?<PageBullet  
                            page={page}
                            active={true}
                            redirect={this.props.onInitSeries}
                            />
                            :<PageBullet  
                            page={page}
                            active={false}
                            redirect={this.props.onInitSeries}
                            />}
                        </>
                    )
                }
                 if(page===this.props.serieses.page_number&&page>3&&page!==this.props.serieses.total_pages){
                    pages=(
                        <>
                            {pages}
                            <div className={classes.dot} >...</div>
                            {this.props.serieses.page_number===page 
                            ?<PageBullet  
                            page={page}
                            active={true}
                            redirect={this.props.onInitSeries}
                            />
                            :<PageBullet  
                            page={page}
                            active={false}
                            redirect={this.props.onInitSeries}
                            />}
                        </>
                    )
                }

                if(page===this.props.serieses.total_pages && page>3 ){
                    pages=(
                        <>
                            {pages}
                            <div className={classes.dot} >...</div>
                            {this.props.serieses.page_number===page 
                            ?<PageBullet  
                            page={page}
                            active={true}
                            redirect={this.props.onInitSeries}
                            />
                            :<PageBullet  
                            page={page}
                            active={false}
                            redirect={this.props.onInitSeries}
                            />}
                        </>
                    )
                }
                page++;
            }
            currentpage=this.props.serieses.page_number
            totalpages=this.props.serieses.total_pages
        }

        return(
           <div>
               <header className={classes.postcontainer}>
                   <p className={classes.posthead3}><Link to='/' ><i className="fa fa-arrow-left" aria-hidden="true"></i></Link></p>
                   <p className={classes.posthead}>Series</p>
                   {localStorage.getItem('token')?(<p className={classes.posthead2} >Welcome, {localStorage.getItem('username')}</p>):(<p className={classes.posthead2} ><Link to='/Auth' onClick={this.onRedirectHandler} >Login/Singnup</Link></p>)}
                </header> 
                <div className={classes.wraper}>                
                      {serieses}              
                </div>
                <div className={classes.pages} >
                    {currentpage===1?null:<div className={classes.pageicon} onClick={()=>this.props.onInitSeries(1)} ><i className="fa fa-angle-double-left" aria-hidden="true"></i></div>}
                    {currentpage===1?null:<div className={classes.pageicon} onClick={()=>this.props.onInitSeries(currentpage-1)} ><i className="fa fa-angle-left" aria-hidden="true"></i></div>}
                    {pages}
                    {currentpage===totalpages?null:<div className={classes.pageicon} onClick={()=>this.props.onInitSeries(currentpage+1)} ><i className="fa fa-angle-right" aria-hidden="true"></i></div>}
                    {currentpage===totalpages?null:<div className={classes.pageicon} onClick={()=>this.props.onInitSeries(totalpages)} ><i className="fa fa-angle-double-right" aria-hidden="true"></i></div>}
                </div>
                <br/>
                <Footer/>
                
           </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        serieses:state.series.series,
        loading:state.series.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onInitSeries:(pn)=>dispatch(PostActions.initSeries(pn)),
        onRedirect:path=>dispatch(UserActions.redirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesList);

