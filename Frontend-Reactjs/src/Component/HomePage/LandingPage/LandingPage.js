import React from 'react'
import classes from './LandingPage.module.css'
import {Link} from 'react-router-dom' 


const LandingPage = props=>{    

    var searchWithLogin=(
        <div className={classes.lwrapper} >     
            <div className={classes.search} >
                <input className={classes.label} 
                       placeholder='what are you searching for?' 
                       value={props.value}
                       onChange={props.change}
                   
                />
                <button className={classes.searchButton} onClick={props.search} ><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
            
            <Link className={classes.linkText} to={`/Auth`}><button className={classes.cardbtn} >Signin</button></Link>
        </div>
    )
    var onlySearchBar=(
        <div className={classes.search} >
                <input className={classes.label} 
                       placeholder='what are you searching for?' 
                       value={props.value}
                       onChange={props.change}
                />
                <button className={classes.searchButton} onClick={props.search} ><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
    )

    return(
        <section id='home' className={classes.landingpage}>            
            <div className={classes.title} >
                <span>Hola Naiveminds</span><br/>
                <span>Your escape to naivness</span> <br/>
                <p>Fall in love with our freshly brewed blogs</p>   
                <div className={classes.buttonContainer}>
                {localStorage.getItem('pk')? onlySearchBar:searchWithLogin}
                </div>

            </div>
            <div className={classes.bubble} >
                hi
            </div>
        </section>
    )
}

export default LandingPage;