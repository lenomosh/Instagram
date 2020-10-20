import React,{useState} from 'react'
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Axios from "axios";
import apiUrls from "../environment";
import {Divider, message} from "antd/es";
import {connect} from "react-redux";
import {setCurrentUser} from "../../redux/user/user.actions";
import {Link, Redirect} from "react-router-dom";
import {Spin} from "antd";
import './login.styles.scss'

const UserLogin =({loginUser})=>{
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const onFinish = values => {
        setLoading(true)
        Axios.post(apiUrls.user_login, {
            password: values.password,
            username: values.username,
            remember:values.remember
        },{
            Accept:'application/json'
        }).then( res =>{
            loginUser(res.data)
            setLoading(false)
            message.success('Login was success!',5)
            setSuccess(true)


        }).catch(err =>{
            message.error(err.response.data.description,10)
            setLoading(false)
        })
    };

    return (
        <div className={"loginComponent"}>
            <Spin spinning={loading}>
                <div className="login-form-wrapper">
                    <div className="row justify-content-center align-self-center">
                        <div className="col-sm-12">
                            <div className="card px-4">
                                <div className="card-body">
                                    <div className="login-form-title">
                                        Photrashion
                                    </div>
                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                    >
                                        {success && <Redirect to={'/'}/>}
                                        <Form.Item
                                            name="username"
                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                        >
                                            <Input placeholder="Username or email" size={"large"} />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your Password!' }]}
                                        >
                                            <Input
                                                type="password"
                                                size={"large"}
                                                placeholder="Password"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button  type="primary" block htmlType="submit" className="login-form-button">
                                                Log in
                                            </Button>
                                            <Divider>or</Divider>
                                            <div className="text-center">
                                                <button className={"btn btn-link"}>
                                                    <span className={"login-social-link"}>Login with Facebook </span>


                                                </button>
                                                <a className={"login-forgot-password"} href="#">Forgot password?</a>

                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-12 mt-3">
                            <div className="card p-2">
                                <div className="login-create-account">
                                Don't have an account? <Link to={"/signup"}>Sign up</Link>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>

        </div>
    )

}
const mapDispatchToProps = (dispatch)=>(
    {loginUser:user=>dispatch(setCurrentUser(user))})
export default connect(null,mapDispatchToProps) (UserLogin)
