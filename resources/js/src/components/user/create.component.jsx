import React, {useState} from 'react'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {Form, Input, Tooltip, Checkbox, Button} from "antd";
import Axios from "axios";
import apiUrls from "../environment";
import {message} from "antd/es";
import {Link, Redirect} from "react-router-dom";
import Divider from "antd/es/divider";
import Spin from "antd/es/spin";
import './create.styles.scss'


const UserCreate = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true)

        Axios.post(apiUrls.user_create, {
            name: values.name,
            email: values.email,
            password: values.password,
            username: values.username
        }, {
            Accept: 'application/json'
        }).then(res => {

            message.success('Account created successfully.', 10)

            setSuccess(true)
            setLoading(false)
        }).catch(err => {
            message.error(err.response.data.description, 10)
            setLoading(false)
            // console.log(err.response)
        })
    };

    return (
        <div className={"UserSignup"}>
            {success && <Redirect to={'/login'}/>}
            <Spin spinning={loading}>
            <div className="form-wrapper">
                        <div className="card">
                            <div className="card-body">
                                <p className="h4 text-center mb-5">Photrashion</p>

                                <Form
                                    form={form}
                                    name="register"
                                    onFinish={onFinish}
                                    scrollToFirstError
                                    layout={'vertical'}
                                >
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Name is required',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder={"Full name"}/>
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name="username"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your username!',
                                                        whitespace: true,
                                                    },
                                                ]}
                                            >
                                                <Input placeholder={"Username"}/>
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={"Email"}/>
                                    </Form.Item>


                                    <div className="row">
                                        <div className="col-sm-6">

                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                    {
                                                        min: 8,
                                                        message: "Password must be at least 8 characters"
                                                    }
                                                ]}
                                                hasFeedback
                                            >
                                                <Input.Password placeholder={"Password"}/>
                                            </Form.Item>

                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name="confirm"
                                                dependencies={['password']}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please confirm your password!',
                                                    },
                                                    ({getFieldValue}) => ({
                                                        validator(rule, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }

                                                            return Promise.reject('The two passwords that you entered do not match!');
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password placeholder={"Confirm Password"}/>
                                            </Form.Item>


                                        </div>
                                    </div>
                                    <p className={"user-signup-policy-agreement"}>By signing up, you agree to our terms, Data Policy and Cookies Policy.</p>
                                    <Form.Item className={"user-signup-submit-button-wrapper"}>
                                        <Button className={"user-signup-submit-button"} type="primary" htmlType="submit">
                                            Register
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                <div className="mt-3">
                    <div className="card p-4">
                        <div className="login-create-account">
                            Already have an account? <span><Link to={"/login"}>Login</Link></span>
                        </div>
                    </div>
                </div>



            </div>
            </Spin>
        </div>
    );
}
export default UserCreate
