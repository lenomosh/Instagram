import React from 'react'
import './LandingPage.styles.scss'
import UserLogin from "../../components/user/login.component";
const LandingPage = ()=>{
    return(
        <div className={'landingPage container'}>
            <div className="row">
                <div className="col-sm-7">
                    <div className="landing-page-promo">

                    </div>
                </div>
                <div className="col-sm-5">
                    <UserLogin/>
                </div>
            </div>
        </div>
    )
}
export default LandingPage
