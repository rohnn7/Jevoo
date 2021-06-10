import React from 'react'
import classes from './HorizontalPostCard.module.css'
import TextEllipsis from 'react-text-ellipsis';
import ReactHtmlParser from 'react-html-parser';

const HorizontalPostaCard = props=>{

    var node = ReactHtmlParser(props.markdown)
    var server = 'http://127.0.0.1:8000'
    var image= server + props.image
    
    return(
        <div className={classes.PostCardContainer} >
            <div className={classes.PostCardImageSectipn} >
                <img src={image } className={classes.PostCardImage} alt='priview'/>
            </div>
            <div className={classes.PostCardDetailSection} >
                
                <div className={classes.PostCardTitle} >
                
                    <p>
                            {props.title}
                    </p>
                </div>
                <div className={classes.PostCardDescription} > 
                    <TextEllipsis
                        lines={3} 
                        tag={'div'} 
                        ellipsisChars={'...'}>
                            {node}
                     </TextEllipsis>
                    <hr/>
                </div>
              
            </div>
        </div>
    )
}

export default HorizontalPostaCard