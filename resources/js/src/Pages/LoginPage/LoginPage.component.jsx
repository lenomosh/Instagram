import React from 'react'
import UserLogin from "../../components/user/login.component";
import './LoginPage.styles.scss'
const LoginPage =()=>{
    return(
        <div className={"LoginPage"}>
            <div className="form-wrapper">
                <div className="row mt-5 justify-content-center align-self-center">

                    <div className="col-sm-4 mt-5">
                                <UserLogin/>

                    </div>
                </div>

            </div>
        </div>
    )

}
export default LoginPage
