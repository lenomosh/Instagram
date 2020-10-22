import React from 'react'
import LandingPage from "../../Pages/LandingPage/LandingPage.component";
import './PublicHomepage.styles.scss'

const PublicHomepage = ()=>{


    return (
        <div className={"public-homepage"}>
            <LandingPage/>
        </div>
    )

   /* return (
        <div className={"LoginPage"}>
            <HeaderTemplate/>
            <Switch>

                <Route exact path={'/'}>
                    <LandingPage/>
                </Route>
                <Route exact path={'/login'}>
                    <UserLogin/>
                    {/!*{currentUser?<Redirect to={'/'}/>:<UserLogin/>}*!/}
                </Route>
                <Route exact path={'/register'}>
                    <UserCreate/>
                    {/!*{currentUser?<Redirect to={'/'}/>:<UserCreate/>}*!/}
                </Route>
                <Route exact path={'/404'} component={PageNotFound}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>

        </div>
    )*/
}
export default PublicHomepage
