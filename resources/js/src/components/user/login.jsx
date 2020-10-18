import React,{useState} from 'react'
import Form from "antd/es/form";
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import Input from "antd/es/input";
import Checkbox from "antd/es/checkbox";
import Button from "antd/es/button";
import Axios from "axios";
import apiUrls from "../environment";
import {Divider, message} from "antd/es";
import {connect} from "react-redux";
import {setCurrentUser} from "../../redux/user/user.actions";
import {Redirect} from "react-router-dom";
import {Spin} from "antd";

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
            // console.log(res.data)
            loginUser(res.data)
            setLoading(false)
            message.success('Login was success!',5)
            setSuccess(true)


        }).catch(err =>{
            message.error(err.response.data.description,10)
            // console.log(err.response)
            setLoading(false)
        })

        // console.log('Received values of form: ', values);
    };

    return (
        <Spin spinning={loading}>
        <div className="form-wrapper">
            <div className="row justify-content-center align-self-center">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <p className="h4 text-center">Login</p>

                            <Divider/>

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
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                    <Button  type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    Or <a href="/register">register now!</a>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </Spin>
    )

}
const mapDispatchToProps = (dispatch)=>(
    {loginUser:user=>dispatch(setCurrentUser(user))}
)
export default connect(null,mapDispatchToProps) (UserLogin)
