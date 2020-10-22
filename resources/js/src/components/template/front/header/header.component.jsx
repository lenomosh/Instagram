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
import apiUrls, {axiosHeader, siteUrl} from "../../../environment";
import Popover from "antd/es/popover";
import Button from "antd/es/button";
import './header.styles.scss';
import {Badge, Input, Upload, message,  Spin, Typography} from "antd/es";
import Modal from "antd/es/modal";
import Axios from "axios";
import List from "antd/es/list";
import Skeleton from "antd/es/skeleton";


const {Dragger} = Upload
const PostUploader = ({isVisible,token}) =>{
    const [modalVisible, setModalVisible] = useState(true);
    const [image,setImage] = useState(null)
    const [fileList, setFileList] = useState([]);
    const [imageCaption, setImageCaption] = useState("");
    const [allowUpload, setAllowUpload] = useState(false);
    const [loading, setLoading] = useState(false);
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
        // console.log("*".repeat(50))
        // console.log(token)
        setLoading(true)
        const form = new FormData()
        form.append('caption',imageCaption)
        form.append('image',image)
        const url = `${apiUrls.post.create}`
        Axios.post(url,form,{
           headers:{
               'Accept' : 'application/json',
               'Content-Type': 'multipart/form-data',
               Authorization:`Bearer ${token}`}
        }).then( res =>{
            message.success('Post Created Successfully was success!',5)
            setLoading(false)
            isVisible()
        }).catch(err =>{
            if (err.response?.status === 409){
                message.error("Invalid credentials")
            }else if (err.response?.status ===400){
                err.response.data.errors.map(e=>message.error(e,5))
            }else if(err.response?.status === 422){
                err.response.data.errors.map(e=>message.error(e,5))
            }
            else{
                message.error("Internal Server Error",5)
            }
            setLoading(false)
            console.log(err)
        })
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
            <Spin spinning={loading}>
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
            </Spin>

        </Modal>
    )

}
const HeaderTemplate = ({logoutUser, currentUser}) => {
    // console.log("*".repeat(50))
    const [searchResult, setSearchResult] = useState([]);
    // console.log(currentUser.token)
    const [modalVisible, setModalVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const userLogout = ()=>{

        Axios.post(`${apiUrls.user.logout}`,null,{
            headers:{...axiosHeader,
                Authorization:`Bearer ${currentUser?.token}`}

        }).then(res=>{
            message.success("Logout Success")
            logoutUser()

        }).catch(err=>{
            console.log(err)
            message.error("Error logging out")
        })
    }
    const handleSearch = event=>{
        const query = event.target.value
        if (query.trim().length>3){
            setIsSearching(true)
            Axios.post(`${apiUrls.profile.search}`,{q:query},{
                headers:{
                    ...axiosHeader,
                    Authorization:`Bearer ${currentUser.token}`
                }
            }).then(res=>{
                // console.log(res.data)
                setSearchResult(res.data.result)
                setIsSearching(false)
            }).catch(err=>{
                message.error("Error during search!",5)
                console.log(err)
            })

        }
    }
    if (!currentUser){
        window.location.href ='/login'
    }
    // console.log(searchResult)
    return (
        <div className={`row HeaderTemplate`}>
            {modalVisible &&
            <PostUploader token={currentUser.token} isVisible={()=>setModalVisible(false)}/>}
            <div className="col-sm-3">
                <div className="header-logo">
                    <Link to={'/'}>
                        Photrashion
                    </Link>
                </div>
            </div>
            <div className="col-sm-6 header-search-form-section">
                <Popover trigger={"click"}
                         placement={"bottom"}
                         arrowPointAtCenter
                         visible={searchResult.length>0}
                         style={{width:'300px'}}
                         content={
                    <List
                        className="header-user-search-result"
                        itemLayout="horizontal"
                        dataSource={searchResult}
                        renderItem={item => (
                            <List.Item>
                                <Skeleton avatar  loading={isSearching}  active>
                                    <Link to={'/profile/'+item.id}>

                                    <List.Item.Meta
                                        avatar={
                                            <Link to={'/profile/'+item.id}>
                                                {item.profile_picture ?
                                                    <Avatar size={50} src={item.profile_picture}/> :
                                                    <Avatar size={50}/>}
                                            </Link>

                                        }
                                        title={<Link to={'/profile/'+item.id}>{item.username}</Link>}

                                    />
                                    <Typography.Paragraph className={"pt-4"} ellipsis={{ rows: 1, expandable: false, symbol: 'more' }}>
                                        {item.bio}
                                    </Typography.Paragraph>
                                    </Link>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                }>

                    <div className="header-search">
                        <Input onChange={handleSearch} size={"large"} placeholder={"Search for people on Photrashion"} className={"col-sm-6"}/>
                    </div>
                </Popover>
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

                            <Popover placement={"bottom"} content={"Coming Soon"}>
                                <Badge count={2}>
                                    <SendOutlined className={"header-nav-icon"}/>
                                </Badge>
                            </Popover>
                        </div>
                        <div className="link">

                            <Popover placement={"bottom"} content={"Coming soon"}>
                                <CompassOutlined className={"header-nav-icon"}/>
                            </Popover>
                        </div>
                        <div className="link">
                            <Popover placement={"bottom"} content={"Coming soon"}>
                                <Badge count={9}>
                                    <HeartOutlined className={"header-nav-icon"}/>
                                </Badge>
                            </Popover>
                        </div>
                        <div className="link">
                                    <Popover placement={"bottom"} content={
                                        <div className={"header-popover-user-actions-wrapper"}>
                                            <div className="d-flex flex-column">
                                                <Link to={"/profile/"+currentUser.user.profile.id} className="header-popover-user-action">
                                                    <UserOutlined className={"header-popover-user-action-icon"} />Profile
                                                </Link>

                                                <span onClick={userLogout} className="header-popover-user-action header-logout">
                                                    <LogoutOutlined  className={"header-popover-user-action-icon"} />
                                                    Log out


                                                </span>
                                            </div>

                                        </div>
                                    }
                                             trigger="click">
                                        {currentUser.user.profile.profile_picture?
                                            <Avatar src={siteUrl+currentUser.user.profile.profile_picture} className={"header-nav-icon"}/>
                                            :
                                            <Avatar className={"header-nav-icon"}/>}
                                    </Popover>
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
