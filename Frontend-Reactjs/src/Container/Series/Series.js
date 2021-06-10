import React, { Component } from 'react';
import classes from './Series.module.css'
import Card from '../../Component/Series/Card/Card'
import ScrollContainer from 'react-indiana-drag-scroll'
import { connect} from 'react-redux'
import * as PostActions from '../../Store/Action/Series'
import Loader from '../../Component/UI/Loader/Loader'
import ReactHtmlParser from 'react-html-parser';


class Series extends Component{
    componentDidMount(){
        this.props.onInitSeries(1)
    }

    render(){
        var node;
        var serieses=(<Loader className={classes.loader}/>);
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
        }

        return(
            <ScrollContainer className={classes.wraper}>                
                <div className={classes.slidercontainer} >
                    {serieses}
                </div>
            </ScrollContainer>
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
        onInitSeries:(pn)=>dispatch(PostActions.initSeries(pn))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);