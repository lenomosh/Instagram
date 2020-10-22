import React from 'react'
import './RegistrationPage.styles.scss'
import UserCreate from "../../components/user/create.component";
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
