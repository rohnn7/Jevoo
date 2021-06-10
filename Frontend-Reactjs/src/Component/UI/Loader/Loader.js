import React from 'react'
import classes from './Loader.module.scss'

const Loader = (props)=>{
    return(
        <div className={`${classes.loader} ${classes.loader1}` }>
            <div>
                <div>
                    <div>
                         <div>
                            <div>
                                 <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;