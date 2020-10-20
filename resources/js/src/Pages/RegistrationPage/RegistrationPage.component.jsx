import React from 'react'
import './RegistrationPage.styles.scss'
import UserLogin from "../../components/user/login.component";
import UserCreate from "../../components/user/create.component";
import {Link} from "react-router-dom";
const RegistrationPage = ()=>{

    return(

        <div className={"RegistrationPage"}>
            <div className="form-wrapper">
                <div className="row justify-content-center align-self-center">
                    <div className="col-sm-4">
                        <UserCreate/>



                    </div>
                </div>

            </div>
        </div>
    )

}

export default RegistrationPage
