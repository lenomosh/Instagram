import React from 'react';
import './App.scss';
import {Route,Switch,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import AuthHomepage from "./components/hompage/AuthHomePage";
import PublicHomepage from "./components/hompage/PublicHomepage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App({currentUser}) {

  return (
      <div>
              <Route  path={'/'} render={()=>currentUser?<AuthHomepage />:<PublicHomepage/>}/>
      </div>

  );
}
const mapStateToProps = ({user:{currentUser}})=>({currentUser})
export default connect(mapStateToProps)(App);
