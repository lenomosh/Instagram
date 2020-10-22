import React from 'react';
import './App.scss';
import {Route,Switch,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import AuthHomepage from "./components/homepage/AuthHomePage";
import PublicHomepage from "./components/homepage/PublicHomepage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import LoginPage from "./Pages/LoginPage/LoginPage.component";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage.component";
import UserProfile from "./components/ProfilePage/UserProfile.component";

function App({currentUser}) {

  return (
      <div>
          <Switch>
              <Route exact path={'/'} render={()=>{
                  if (currentUser) return (<AuthHomepage/>)
                  return(<PublicHomepage/>)
              }}/>
              <Route exact path={'/profile/:profile_id'}>
                  {
                  currentUser? <UserProfile/>: <Redirect to={'/'}/>
              }
              </Route>
              <Route exact path={'/login'}>
                  {currentUser?<Redirect to={'/'}/>:<LoginPage/>}
              </Route>
              <Route exact path={'/signup'}>
                  {currentUser?<Redirect to={'/'}/>:<RegistrationPage/>}

              </Route>
              <Route component={PageNotFound} />
          </Switch>
      </div>

  );
}
const mapStateToProps = ({user:{currentUser}})=>({currentUser})
export default connect(mapStateToProps)(App);
