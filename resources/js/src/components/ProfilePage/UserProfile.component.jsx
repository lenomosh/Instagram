import React, {useEffect, useState} from "react";
import {Tabs, Row, Col, Avatar, Typography, Rate, Button, message, Layout} from "antd";
import {Switch, useParams} from 'react-router-dom'
import "./UserProfile.styles.scss";
import Axios from "axios";
import apiUrls, {axiosHeader, siteUrl} from "../environment";
import {
    SettingOutlined,
    TableOutlined,
    SolutionOutlined,
    HeartFilled,
    MessageFilled,
    CameraOutlined,
    SmileOutlined
} from '@ant-design/icons'
import {connect, useSelector} from "react-redux";
import List from "antd/es/list";
import PostRead from "../Post/read/read";
import Upload from "antd/es/upload";
import {UploadOutlined} from '@ant-design/icons'
import Paragraph from "antd/es/typography/Paragraph";
import HeaderTemplate from "../template/front/header/header.component";
import {Popover, Spin} from "antd/es";
import Result from "antd/es/result";


const UserPost = ({post}) => {
    const [hidePostStats, setHidePostStats] = useState(true);
    const toggleShowStats = () => {
        setHidePostStats(!hidePostStats)
    }
    const [loading, setLoading] = useState(false);

    return (
        <div onMouseEnter={toggleShowStats} onMouseLeave={toggleShowStats}
             style={{backgroundImage: `url(${siteUrl + post.path})`}} className={"user-post-wrapper"}>
            <div hidden={hidePostStats} className="user-post-wrapper-overlay">
            <span className="user-post-stats">
                <span className={"user-post-like-count"}>
                    <HeartFilled className={"user-post-like-count-icon"}/>{post.likes.length}
                </span>
                <span className="user-post-comment-count">
                    <MessageFilled className={"user-post-comment-count-icon"}/>{post.comments.length}
                </span>
            </span>

            </div>

        </div>
    )
}

const LoadUserPosts = ({posts}) => {
    return (
        <div className="load-user-posts-container m-auto">
            <List
                // itemLayout="horizontal"

                grid={{gutter: 16, column: 3}}
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        <UserPost post={item}/>
                    </List.Item>
                )}
            />
            <div className="row m-auto">
                {[1, 2, 3, 4].map(element =>
                    <div key={element} className={"col-sm-4"}>

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
    const [userProfile, setUserProfile] = useState('');
    const [profilePicture, setProfilePicture] = useState(null)
    const [fileList, setFilelist] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser)
    const [loading, setLoading] = useState(false);
    const {profile_id} = useParams()
    const isProfileOwner = parseInt(profile_id) === currentUser.user.profile.id
    const [user_has_followed, setUser_has_followed] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    // console.log('profile_id', profile_id)
    // console.log('user_profile_id', currentUser.user.profile.id)
    const followUser = () => {
        if (!user_has_followed) {
            setButtonLoading(true)

            Axios.post(`${apiUrls.follower.create}`, {
                profile_id: userProfile.id
            }, {
                headers: {
                    ...axiosHeader,
                    Authorization: `Bearer ${currentUser.token}`
                }
            }).then(res => {
                setUser_has_followed(res.data)
                setButtonLoading(false)
                setFollowersCount(followersCount + 1)
                // message.success(`You are now following ${userProfile.owner.username}`,4)
            }).catch(err => {
                console.log(err)
                setButtonLoading(false)
                message.error("Server error! Please try again.!", 5)
            })

        }
    }
    const unfollowUser = () => {
        if (user_has_followed?.id) {
            setButtonLoading(true)

            Axios.delete(`${apiUrls.follower.del + user_has_followed.id}`, {
                headers: {
                    ...axiosHeader,
                    Authorization: `Bearer ${currentUser.token}`
                }
            }).then(res => {
                setUser_has_followed(null)
                setButtonLoading(false)
                setFollowersCount(followersCount - 1)
                // message.success(`You've unfollowed ${userProfile.owner.username}`,4)
            }).catch(err => {
                console.log(err)
                setButtonLoading(false)
                message.error("Server error! Please try again.!", 5)
            })

        } else {
            message.error("Internal server error!")
        }
    }
    const loadUser = () => {
        Axios.get(`${apiUrls.profile.read + profile_id}`, {
            headers: {
                ...axiosHeader,
                Authorization: `Bearer ${currentUser.token}`
            }
        })
            .then(res => {
                setUserProfile(res.data)
                setLoading(false)
                setUser_has_followed(res.data.user_has_followed)
                setFollowersCount(res.data.followers.length)
                setFollowingCount(res.data.following.length)
                // console.log(res.data)

            }).catch(err => {
            message.error("Error fetching data from server!", 5)
            setLoading(false)
            console.log(err)
        })
    }
    useEffect(() => {
        if (!userProfile){

            setLoading(true)
            loadUser()
        }
        return () => {

        };
    }, [userProfile.length]);

    const changeUserBio = value => {
        Axios.patch(`${apiUrls.profile.update + currentUser.user.profile.id}`, {
            bio: value
        }, {
            headers: {...axiosHeader, Authorization: `Bearer ${currentUser.token}`}
        }).then(res => {
                message.success("Bio updated successfully", 5)
            }
        ).catch(err => {
            message.error("Error!", 5)
            console.log(err)
        })
    }
    const handleImageChange = (data) => {
        const file = data.file
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return false
        }
        setProfilePicture(file)
        setFilelist([file])
    }
    const handlePicUpload = () => {
        const form = new FormData()
        form.append('image', profilePicture)
        form.append('_method', 'PUT')
        const url = `${apiUrls.profile.update + currentUser.user.profile.id}`
        Axios.post(url, form, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${currentUser.token}`
            }
        }).then(res => {
            message.success('Picture Updated Successfully!', 5)
            // setLoading(false)
            // isVisible()
        }).catch(err => {
            if (err.response) {
                if (err.response?.status === 409) {
                    message.error("Invalid credentials")
                } else if (err.response?.status === 400) {
                    err.response.data.errors.map(e => message.error(e, 5))
                } else if (err.response?.status === 422) {
                    err.response.data.errors.map(e => message.error(e, 5))
                } else {
                    message.error("Internal Server Error", 5)
                }
            }
            console.log(err)
        })
    }
    return (
        <Layout className="user-profile ">
            <HeaderTemplate/>
            <Content style={{padding: '70px'}}>
                <div className={"pt-5"}>
                    <div className="col-sm-12 m-auto">
                        <div className="col-sm-8 m-auto user-profile-header">
                            <Spin spinning={loading}>
                                {userProfile &&
                                <div className="row">
                                    <div className="col-sm-4 align-self-center align-items-center">
                                        {userProfile.profile_picture ?
                                            <Avatar
                                                src={siteUrl + userProfile.profile_picture}
                                                size={150} className={"user-profile-header-avatar"}/> :
                                            <Avatar size={150} className={"user-profile-header-avatar"}/>

                                        }
                                        {isProfileOwner && <span>

                                        <br/>
                                        <br/>
                                        <Upload
                                            fileList={fileList}
                                            onChange={handleImageChange}
                                            name={"image"}
                                            multiple={"false"}
                                            beforeUpload={() => false}>

                                            <Button icon={<UploadOutlined/>}>Click to Upload</Button>

                                        </Upload>
                                            {profilePicture &&
                                            <Button type={"primary"} onClick={handlePicUpload}>Click to Upload</Button>
                                            }
                                        </span>}
                                    </div>
                                    <div className="col-sm-8">

                                        <div className="user-profile-header-user-actions">

                                <span className="user-profile-header-username">
                            {userProfile.owner.username}
                        </span>
                                            {isProfileOwner ?
                                                <span>

                                            <span className="user-profile-edit-button">
                                                <Popover content={"Coming soon"}>

                            <button>Edit Profile</button>

                                                </Popover>
                        </span>
                                                    <span className="user-profile-setting-button">
                                                        <Popover content={"Coming Soon"}>
                            <SettingOutlined className={"user-profile-settings-icon"}/>

                                                        </Popover>
                        </span>
                                                </span>
                                                : <span>
                                                    {
                                                        user_has_followed ?
                                                            <Button onClick={unfollowUser} loading={buttonLoading}
                                                                    className={"user-profile-action-follow-button"}
                                                                    type={"secondary"}>Unfollow</Button> :
                                                            <Button onClick={followUser} loading={buttonLoading}
                                                                    className={"user-profile-action-follow-button"}
                                                                    type={"primary"}>Follow</Button>

                                                    }
                                                </span>

                                            }
                                        </div>
                                        <div className="user-profile-header-user-stats">
                                            <span
                                                className={"user-profile-user-stat"}><b>{userProfile.owner.posts.length}</b> posts</span>
                                            <span className={"user-profile-user-stat"}><b>{followersCount}</b> followers</span>
                                            <span className={"user-profile-user-stat"}><b>{followingCount}</b> following</span>
                                        </div>
                                        <div className="user-profile-header-user-name">
                                            {userProfile.owner.name}
                                        </div>
                                        <div className="user-profile-header-bio">
                                            <Paragraph editable={
                                                isProfileOwner ?
                                                    {

                                                        maxLength: 200,
                                                        autoSize: true,
                                                        onChange: changeUserBio

                                                    } : false}
                                                       copyable={!isProfileOwner}
                                            >
                                                {userProfile.bio}
                                            </Paragraph>
                                        </div>
                                    </div>
                                </div>}

                            </Spin>

                        </div>
                        <div className="user-profile-body">
                            <Tabs defaultActiveKey="1" centered>
                                <TabPane tab={
                                    <span>
          <TableOutlined style={{verticalAlign: "middle"}}/>
          Posts
        </span>
                                } key="1">
                                    <div className="w-100">

                                        {userProfile &&
                                        <Spin spinning={loading}>
                                            <LoadUserPosts posts={userProfile.owner.posts}/>
                                        </Spin>}
                                    </div>
                                </TabPane>
                                <TabPane tab={
                                    <span>
                                <SolutionOutlined style={{verticalAlign: "middle"}}/>Tagged
                            </span>
                                }
                                         key="2">
                                    <Result
                                        icon={<SmileOutlined />}
                                        title="Coming Soon"
                                    />
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
const mapStateToProps = ({user: {currentUser}}) => ({currentUser})
export default connect(mapStateToProps)(UserProfile);
