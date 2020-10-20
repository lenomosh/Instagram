import React, {useEffect, useState} from "react";
import {Tabs, Row, Col, Avatar, Typography, Rate, Button, message, Layout} from "antd";
import {Switch, useParams} from 'react-router-dom'
import "./UserProfile.styles.scss";
import Axios from "axios";
import apiUrls, {axiosHeader} from "../environment";
import {SettingOutlined, TableOutlined, SolutionOutlined,HeartFilled,MessageFilled} from '@ant-design/icons'
import {useSelector} from "react-redux";
import List from "antd/es/list";
import PostRead from "../Post/read/read";
import Upload from "antd/es/upload";
import {UploadOutlined} from '@ant-design/icons'
import Paragraph from "antd/es/typography/Paragraph";
import HeaderTemplate from "../template/front/header/header.component";



const UserPost = () => {
    const [hidePostStats, setHidePostStats] = useState(true);
    const toggleShowStats = ()=>{
        setHidePostStats(!hidePostStats)
    }
    return (
        <div onMouseEnter={toggleShowStats} onMouseLeave={toggleShowStats}    className={"user-post-wrapper"}>
            <div hidden={hidePostStats} className="user-post-wrapper-overlay">
            <span  className="user-post-stats">
                <span className={"user-post-like-count"}>
                    <HeartFilled className={"user-post-like-count-icon"}/>200
                </span>
                <span className="user-post-comment-count">
                    <MessageFilled className={"user-post-comment-count-icon"}/>190
                </span>
            </span>

            </div>

        </div>
    )
}

const LoadUserPosts = ()=>{
    return (
        <div className="load-user-posts-container m-auto">
            <div className="row m-auto">
                {[1,2,3,4].map(element=>
                    <div key={element} className={"col-sm-4"}>

                        <UserPost/>
                    </div>
                )}

            </div>
        </div>
    )
}
const {Title, Text} = Typography;
const {TabPane} = Tabs
const {Content} = Layout
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [fileList, setFilelist] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser)
    const {user_id} = useParams()
    const uploadProps = {
        name: 'image',
        fileList,
    };

    return (
        <Layout className="user-profile ">
            <HeaderTemplate/>
            <Content style={{padding: '70px'}}>
                <div className={"pt-5"}>
                    <div className="col-sm-12 m-auto">
                        <div className="col-sm-8 m-auto user-profile-header">
                            <div className="row">
                                <div className="col-sm-4 align-self-center align-items-center">
                                    <Avatar size={150} className={"user-profile-header-avatar"}/>
                                </div>
                                <div className="col-sm-8">
                                    <div className="user-profile-header-user-actions">
                                <span className="user-profile-header-username">
                            _lennoxomondi
                        </span>
                                        <span className="user-profile-edit-button">
                            <button>Edit Profile</button>
                        </span>
                                        <span className="user-profile-setting-button">
                            <SettingOutlined className={"user-profile-settings-icon"}/>
                        </span>
                                    </div>
                                    <div className="user-profile-header-user-stats">
                                        <span className={"user-profile-user-stat"}><b>44</b> posts</span>
                                        <span className={"user-profile-user-stat"}><b>200</b> followers</span>
                                        <span className={"user-profile-user-stat"}><b>296</b> following</span>
                                    </div>
                                    <div className="user-profile-header-user-name">
                                        Lennox Omondi
                                    </div>
                                    <div className="user-profile-header-bio">
                                        <Paragraph copyable>
                                            ◆Founder - Photrashion Kenya <br/>
                                            ◆Tech. Startup Consultant<br/>
                                            ◆Techpreneur<br/>
                                            ◆Software Engineer<br/>
                                            Email: dirlennox@photrashion.com
                                        </Paragraph>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="user-profile-body">
                            <Tabs defaultActiveKey="1" centered>
                                <TabPane tab={
                                    <span>
          <TableOutlined style={{verticalAlign:"middle"}}/>
          Posts
        </span>
                                } key="1">
                                    <div className="w-100">

                                        <LoadUserPosts/>
                                    </div>
                                </TabPane>
                                <TabPane tab={
                                    <span >
                                <SolutionOutlined style={{verticalAlign:"middle"}}/>Tagged
                            </span>
                                }
                                         key="2">
                                    Tagged
                                </TabPane>
                                }
                            </Tabs>
                        </div>
                    </div>

                </div>

            </Content>

        </Layout>
    );
};
export default UserProfile;
