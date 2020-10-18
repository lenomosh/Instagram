import React from 'react'
import './RegistrationPage.styles.scss'
import UserLogin from "../../components/user/login";
const RegistrationPage = ()=>{

    return(
        <div className={"RegistrationPage"}>
            <div className="form-wrapper">
                <div className="row justify-content-center align-self-center">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <UserLogin/>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )

}

export default RegistrationPage
