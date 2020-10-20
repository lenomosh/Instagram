import React from 'react'
import UserLogin from "../../components/user/login.component";
import './LoginPage.styles.scss'
const LoginPage =()=>{
    return(
        <div className={"LoginPage"}>
            <div className="form-wrapper">
                <div className="row justify-content-center align-self-center">
                    <div className="col-sm-4">
                                <UserLogin/>

                    </div>
                </div>

            </div>
        </div>
    )

}
export default LoginPage
