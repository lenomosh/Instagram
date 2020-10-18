import React, {useState} from 'react'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {Form, Input, Tooltip, Checkbox, Button} from "antd";
import Axios from "axios";
import apiUrls from "../environment";
import {message} from "antd/es";
import {Redirect} from "react-router-dom";
import Divider from "antd/es/divider";
import Spin from "antd/es/spin";


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
        <div>
            {success && <Redirect to={'/login'}/>}
            <Spin spinning={loading}>
            <div className="form-wrapper">
                <div className="row justify-content-center align-self-center">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="h4">Register</p>
                                <Divider/>

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
                                                label="Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Name is required',
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name="username"
                                                label={
                                                    <span>
            Username&nbsp;
                                                        <Tooltip
                                                            title="What do you want others to call you? This will be used to ">
              <QuestionCircleOutlined/>
            </Tooltip>
          </span>
                                                }
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your username!',
                                                        whitespace: true,
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <Form.Item
                                        name="email"
                                        label="E-mail"
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
                                        <Input/>
                                    </Form.Item>


                                    <div className="row">
                                        <div className="col-sm-6">

                                            <Form.Item
                                                name="password"
                                                label="Password"
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
                                                <Input.Password/>
                                            </Form.Item>

                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name="confirm"
                                                label="Confirm Password"
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
                                                <Input.Password/>
                                            </Form.Item>


                                        </div>
                                    </div>


                                    <Form.Item
                                        name="agreement"
                                        valuePropName="checked"
                                        rules={[
                                            {
                                                validator: (_, value) =>
                                                    value ? Promise.resolve() : Promise.reject('Accept the agreement to continue'),
                                            },
                                        ]}
                                    >
                                        <Checkbox>
                                            I have read the <a href="">agreement</a>
                                        </Checkbox>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Register
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            </Spin>
        </div>
    );
}
export default UserCreate
