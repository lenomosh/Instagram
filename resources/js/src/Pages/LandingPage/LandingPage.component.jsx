import React from 'react'
import './LandingPage.styles.scss'
import {Button} from "antd";
const LandingPage = ()=>{
    return(
        <div className={'landingPage'}>
            <div className="welcome-wrapper">
                <p className={'welcome'}>Welcome to One Minute Pitch</p>
                <p className="description">
                    World's first virtual community made by the youth for the youth to promote their business.
                </p>
                <a className={'btn btn-success'} href={'/register'}>Join Us Today</a>

            </div>
        </div>
    )

}
export default LandingPage
