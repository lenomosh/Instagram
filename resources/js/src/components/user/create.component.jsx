import React, {useState} from 'react'
// import {QuestionCircleOutlined} from '@ant-design/icons'
import {Form, Input,  Button} from "antd";
import Axios from "axios";
import apiUrls, {axiosHeader} from "../environment";
import {message} from "antd/es";
import {Link, Redirect} from "react-router-dom";
import Spin from "antd/es/spin";
import {processError} from "../requests";
import {setCurrentUser} from "../../redux/user/user.actions";
import {connect} from "react-redux";
import './create.styles.scss'


const UserCreate = ({loginUser}) => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const url =apiUrls.user.create
    const  handleFinish=values=>{
        console.log(values)
        Axios.post(url,values,{
            headers:axiosHeader
        }
    ).then(res => {
        message.success('Account created successfully.', 5)
        setSuccess(true)
        setLoading(false)
    }).catch(err => {
                if (err.response.status === 422){
                    err.response.data.errors.map(err=>message.error(err,5))
                }
                setLoading(false)
                console.log(err)
    })
        console.log("*".repeat(10),"Onfinish Called","*".repeat(10))

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
                                    onFinish={data=>handleFinish(data)}
                                    scrollToFirstError
                                    layout={'vertical'}
                                >
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name="name"
                                                // initialValue={"Lennox"}
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
                                                // initialValue={"lennox"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your username!',
                                                        whitespace: true,
                                                    },
                                                ]}
                                            >
                                                <Input  placeholder={"Username"}/>
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <Form.Item
                                        name="email"
                                        // initialValue={"lenomosh@gmail.com"}
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
                                                // initialValue={"lenomosh@gmail.com"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                    {
                                                        min: 6,
                                                        message: "Password must be at least 8 characters"
                                                    }
                                                ]}
                                                hasFeedback
                                            >
                                                <Input.Password  placeholder={"Password"}/>
                                            </Form.Item>

                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name="confirm"
                                                dependencies={['password']}
                                                // initialValue={"lenomosh@gmail.com"}
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
                                                <Input.Password  placeholder={"Confirm Password"}/>
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
const mapDispatchToProps = dispatch=>({loginUser:user=>dispatch(setCurrentUser(user))})
export default connect(null,mapDispatchToProps) (UserCreate)
