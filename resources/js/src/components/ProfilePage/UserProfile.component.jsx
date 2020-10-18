import React, {useEffect, useState} from "react";
import {Tabs, Row, Col, Avatar, Typography, Rate, Button, message} from "antd";
import {useParams} from 'react-router-dom'
import "./UserProfile.styles.scss";
import Axios from "axios";
import apiUrls, {axiosHeader} from "../environment";
import {useSelector} from "react-redux";
import List from "antd/es/list";
import PitchRead from "../Pitch/read/read";
import Upload from "antd/es/upload";
import {UploadOutlined} from '@ant-design/icons'
const { Title,  Text } = Typography;
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [fileList, setFilelist] = useState([]);
    const currentUser = useSelector(state=>state.user.currentUser)
    const {user_id} = useParams()
    useEffect(() => {
        if (!user){
            Axios.get(apiUrls.user_profile+user_id,
                {headers:{
                        ...axiosHeader,
                        Authorization:`Bearer ${currentUser.access_token}`
                    }

                })
                .then(res=>setUser(res.data))
                .catch(res=>console.log(res.response))
        }
        return () => {

        };
    });

    const handleUpload = ({ fileList }) => {
        console.log('fileList', fileList);
        setFilelist(fileList)
    };
    const handleSubmit = event => {
        event.preventDefault();

        let formData = new FormData();
        formData.append("image", fileList[0].originFileObj);

        Axios
            .post(apiUrls.profile_picture.create, formData,{

                headers: {
                    Authorization: `Bearer ${currentUser.access_token}`,
                }
            })
            .then(res => {
                message.success("Photo uploaded successfully! Reload to see changed",10)
                console.log("res", res);
            })
            .catch(err => {
                message.error("An error occurred while trying to upload. Try again later",8)
                console.log("err", err);
            });
    };
    const uploadProps = {
        name: 'image',
        fileList,
    };
    console.log("*".repeat(50))
    console.log('user_id',user_id,'current_user_id',currentUser.user.id)
    console.log("*".repeat(50))

    return (
        <div className="UserProfile container pt-lg-5">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                    <Avatar
                        style={{ margin: "auto" }}
                        size={128}
                        src={apiUrls.profile_picture.read+user?.profile_picture?.id}

                    />
                    {currentUser.user.id ===parseInt(user_id) &&
                        <div><br/>

                            <Upload {...uploadProps} onChange={handleUpload} beforeUpload={()=>false}>
                                <Button icon={<UploadOutlined />}>Change profile picture</Button>
                            </Upload>
                            <Button onClick={handleSubmit}>Upload</Button>
                        </div>
                    }
                </Col>
                <Col className="gutter-row" span={18}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={18}>
                            <div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <Title className="seller-name" level={2}>
                                            {user?.name}
                                        </Title>
                                    </div>
                                </div>
                                <Text type="secondary">@{user?.username}</Text>
                            </div>
                            <div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="pt-lg-5 container">
                <p className="h4">Pitches</p>
                <List
                    itemLayout="horizontal"
                    dataSource={user?.pitches}
                    renderItem={item => (
                        <List.Item>
                            <PitchRead pitch={item}/>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};
export default UserProfile;
