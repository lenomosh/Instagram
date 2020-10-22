import React, {useEffect, useState} from 'react'
import HeaderTemplate from "../template/front/header/header.component";
import {Link, Switch} from "react-router-dom";
import {Layout,Avatar, message} from "antd";
import {useSelector} from "react-redux";
import PostIndex from "../Post/Index";
import Axios from "axios";
import apiUrls, {axiosHeader, siteUrl} from "../environment";
import List from "antd/es/list";
const { Content, Footer } = Layout;

const AuthHomepage = ({currentUser})=>{
    const  user = useSelector(state=>state.user.currentUser)
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!profiles.length){
            console.log("*".repeat(100))
            Axios.get(`${apiUrls.profile.index}`,{
                headers:{
                    ...axiosHeader,
                    Authorization:`Bearer ${user.token}`
                }
            }).then(res=>{
                setProfiles(res.data)
                setLoading(false)
            }).catch(err=>{

                setLoading(false)
                console.log(err)
                message.error("Error while loading profiles",5)
            })
        }


        return () => {
        };
    });

    return (
        <Layout className="layout">
            <HeaderTemplate/>
            <Switch>
            <Content style={{ padding: '70px' }}>
                <div className="row m-auto">
                    <div className="col-sm-6">
                        <PostIndex/>

                    </div>
                    <div  className="col-sm-5 card pt-5 ml-5">
                        <List
                            header={                        <div className="text-black h5">Profiles</div>
                            }
                            style={{position:"fixed"}}
                            loading={loading}
                            itemLayout="vertical"
                            dataSource={profiles}
                            renderItem={item => (
                                <List.Item className={"px-4"}>
                                    <Link to={'/profile/'+item.id}>
                                        <List.Item.Meta
                                            avatar={item.profile_picture?

                                                <Avatar size={50} src={siteUrl+ item.profile_picture} />:
                                                <Avatar size={50}/>
                                            }

                                            title={item.owner.username}
                                            description={item.followers.length+` ${item.followers.length===1?"follower":"followers"}`}
                                        />
                                    </Link>
                                </List.Item>
                            )}
                        />,

                    </div>
                </div>
            </Content>

            </Switch>
            <Footer style={{ textAlign: 'center' }}>React Insta ©2020 Created by <a href="https://linkedin.com/in/lenomosh" target={'_blank'}>Lennox Omondi</a></Footer>
        </Layout>
    )
}
export default AuthHomepage
