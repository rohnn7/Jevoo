import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Container/HomePage/HomePage';
import {Route, Switch} from 'react-router-dom';
import PostsList from './Container/Posts/PostsList/PostsList'
import PostDetail from './Container/Posts/PostDetail/PostDetail'
import Authentication from './Container/Authentication/Authentication'
import SeriesList from './Container/Series/SeriesList/SeriesList'
import SeriesDetail from './Container/Series/SeriesDetail/SeriesDetail'
import Admin from './Container/Admin/Admin'
import AdminPanel from './Container/Admin/AdminPanel/AdminPanel'
import SeriesCreate from './Container/Admin/Series/SeriesCreate'
import AuthorSeries from './Container/Admin/Series/AuthorSeries/AuthorSeries'
import Image from './Container/Admin/Image/Image'
import PostCreate from './Container/Admin/Post/PostCreate'
import AuthorImages from './Container/Admin/Image/AuthorImages/AuthorImages'
import PostEdit from './Container/Admin/Post/PostEdit'
import Account from './Container/User/Account/Account'
import SearchPosts from './Container/Posts/SearchPosts/SearchPost'


class App extends Component{
 

  render(){
    return(
      <div>
        <Switch>
            <Route path="/Auth" exact component={Authentication} />
            <Route path="/Search/Results" exact component={SearchPosts} />
            <Route path="/Post/:id"  exact render={(props) => (
              <PostDetail key={props.match.params.id} {...props} />)
            } />
            <Route path="/Posts" exact component={PostsList} />
            <Route path="/Serieses" exact component={SeriesList} />
            <Route path="/Series/:id" exact component={SeriesDetail} />
            <Route path="/Account" exact component={Account} />
            <Route path="/Admin/Panel" exact component={AdminPanel} />
            <Route path="/Admin/Image" exact component={Image} />    
            <Route path="/Admin/Post/Edit" exact component={PostEdit} />
            <Route path="/Admin/Post" exact component={PostCreate} />
            <Route path="/Admin/addSeries" exact component={SeriesCreate} />
            <Route path="/Admin/chooseSeries" exact component={AuthorSeries} />
            <Route path="/Admin/imagelist" exact component={AuthorImages} />
            <Route path="/Admin" exact component={Admin} />
            <Route path="/" exact component={HomePage} />
        </Switch>        
      </div>
    )
  }
}

export default App;
