import React from 'react'
import UserLogin from "../user/login";
import {Switch,Route,Redirect} from "react-router-dom";
import UserCreate from "../user/create";
import HeaderTemplate from "../template/front/header/header";
import LandingPage from "../../Pages/LandingPage/LandingPage.component";
import './PublicHomepage.styles.scss'
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";

const PublicHomepage = ()=>{

    return (
        <div className={"LoginPage"}>
            <HeaderTemplate/>
            <Switch>

                <Route exact path={'/'}>
                    <LandingPage/>
                </Route>
                <Route exact path={'/login'}>
                    <UserLogin/>
                    {/*{currentUser?<Redirect to={'/'}/>:<UserLogin/>}*/}
                </Route>
                <Route exact path={'/register'}>
                    <UserCreate/>
                    {/*{currentUser?<Redirect to={'/'}/>:<UserCreate/>}*/}
                </Route>
                <Route exact path={'/404'} component={PageNotFound}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>

        </div>
    )
}
export default PublicHomepage
