import React from 'react'
import HeaderTemplate from "../template/front/header/header.component";
import {Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import UserProfile from "../ProfilePage/UserProfile.component"
import {useSelector} from "react-redux";
import PostIndex from "../Post/Index";
import PostRead from "../Post/read/read";
const { Content, Footer } = Layout;

const AuthHomepage = ({currentUser})=>{
    const  user = useSelector(state=>state.user.currentUser)

    return (
        <Layout className="layout">
            <HeaderTemplate/>
            <Switch>
            <Content style={{ padding: '70px' }}>
                <div className="row m-auto">
                    <div className="col-sm-6">
                        {/*<UserProfile/>*/}
                        <PostRead/>

                    </div>
                    <div className="col-sm-5">

                    </div>
                </div>
            </Content>

            </Switch>
            <Footer style={{ textAlign: 'center' }}>React Insta ©2020 Created by <a href="https://linkedin.com/in/lenomosh" target={'_blank'}>Lennox Omondi</a></Footer>
        </Layout>
    )
}
export default AuthHomepage
