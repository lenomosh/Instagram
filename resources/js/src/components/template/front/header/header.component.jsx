import React, {useState} from 'react'
import {connect} from "react-redux";
import {logoutCurrentUser} from "../../../../redux/user/user.actions";
import {Link} from "react-router-dom";
import {
    HomeOutlined,
    SendOutlined,
    HeartOutlined,
    CameraOutlined,
    CameraFilled,
    CompassOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import {Avatar} from "antd";
import apiUrls from "../../../environment";
import Popover from "antd/es/popover";
import Button from "antd/es/button";
import './header.styles.scss';
import {Badge, Input, Upload, message, Divider} from "antd/es";
import Modal from "antd/es/modal";


const {Dragger} = Upload
const PostUploader = ({isVisible}) =>{
    const [modalVisible, setModalVisible] = useState(true);
    const [image,setImage] = useState(null)
    const [fileList, setFileList] = useState([]);
    const [imageCaption, setImageCaption] = useState("");
    const [allowUpload, setAllowUpload] = useState(false);
    const handleImageChange = (data)=>{
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
        setImage(file)
        setFileList([file])
    }
    const handlePostUpload = () => {
        console.log("*".repeat(100))
        console.log(image)
        console.log(imageCaption)
        isVisible()
    }
    const handleCancel = () => {
        isVisible()
    }

    const handleCaptionChange =value=> {
        setImageCaption(value)
        setAllowUpload(true)
    }
    return(
        <Modal
            visible={modalVisible}
            onOk={handlePostUpload}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" disabled={!allowUpload} onClick={handlePostUpload}>
                    Upload
                </Button>,
            ]}
            className={"post-upload-modal"}
        >
            <Dragger
                fileList={fileList}
                onChange={handleImageChange}
                name={"image"}
                multiple={"false"}
                beforeUpload={()=>false}
                className={"post-upload-dragger"}>
                <p className="post-upload-dragger-icon-wrapper">
                    <CameraOutlined className={"post-upload-dragger-icon"} />
                </p>
                <p className="post-upload-dragger-text">Click or drag an image to this area to upload</p>
            </Dragger>
            <div className="post-upload-image-caption">
                {image &&
                <Input.TextArea
                    onChange={({target:{value}})=>handleCaptionChange(value)}
                    value={imageCaption}
                    placeholder={"Add a caption"} rows={1}
                    maxLength={100}
                    showCount
                />}
            </div>
        </Modal>
    )

}
const HeaderTemplate = ({logoutUser, currentUser}) => {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <div className={`row HeaderTemplate`}>
            {modalVisible &&
            <PostUploader isVisible={()=>setModalVisible(false)}/>}
            <div className="col-sm-3">
                <div className="header-logo">
                    <Link to={'/'}>
                        Photrashion
                    </Link>
                </div>
            </div>
            <div className="col-sm-6 header-search-form-section">
                <div className="header-search">
                    <Input size={"large"} placeholder={"Search"} className={"col-sm-6"}/>
                </div>
            </div>
            <div className="col-sm-3 header-user-actions">
                <div className="loggedOutUser">
                    <div className="links-wrapper">
                        <div className="link">
                            <span onClick={() => setModalVisible(true)} className={"btn-link"}>
                                <CameraFilled className={"header-nav-icon"}/>
                            </span>
                        </div>
                        <div className="link">

                            <Link to={'/'}><HomeOutlined className={"header-nav-icon"}/></Link>
                        </div>
                        <div className="link">

                            <Link to={'/messages'}>
                                <Badge count={2}>
                                    <SendOutlined className={"header-nav-icon"}/>
                                </Badge>
                            </Link>
                        </div>
                        <div className="link">

                            <Link to={'/messages'}>
                                <CompassOutlined className={"header-nav-icon"}/>
                            </Link>
                        </div>
                        <div className="link">
                            <Link to={'/notifications'}>
                                <Badge count={9}>
                                    <HeartOutlined className={"header-nav-icon"}/>
                                </Badge>
                            </Link>
                        </div>
                        <div className="link">
                            <span>
                                    <Popover content={
                                        <div className={"header-popover-user-actions-wrapper"}>
                                            <div className="d-flex flex-column">
                                                <Link to={"profile"} className="header-popover-user-action">
                                                    <UserOutlined className={"header-popover-user-action-icon"} />Profile
                                                </Link>

                                                <span className="header-popover-user-action header-logout">
                                                    <LogoutOutlined className={"header-popover-user-action-icon"} />
                                                    Log out


                                                </span>
                                            </div>

                                        </div>
                                    }
                                             trigger="click">
                                <Avatar className={"header-nav-icon"}/>
                                    </Popover>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => (
    {logoutUser: () => dispatch(logoutCurrentUser())}
)
const mapStateToProps = ({user: {currentUser}}) => ({currentUser})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderTemplate)
