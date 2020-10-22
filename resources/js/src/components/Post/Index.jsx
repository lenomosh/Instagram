import React,{useState,useEffect} from 'react'
import Axios from "axios";
import PostRead from "./read/read";
import apiUrls, {axiosHeader} from "../environment";
import {connect} from "react-redux";
import {Spin} from "antd";
import List from "antd/es/list";
export const PostAction = ({data,onFinishedSubmit, onErrorOccurred,access_token})=>{
    Axios.post(apiUrls.action.create,data,{
        headers:{
            ...axiosHeader,
            Authorization:`Bearer ${access_token}`
        }
    })
        .then(res =>onFinishedSubmit(res.data))
        .catch(err=>onErrorOccurred(err))
}

const PostIndex = ({currentUser})=>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!posts.length){

            setLoading(true)
            Axios
                .get(`${apiUrls.post.index}`,{
                    headers:{
                        ...axiosHeader,
                        Authorization:'Bearer '+ currentUser.token
                    }
                })
                .then(res=> {
                    setPosts(res.data)
                    setLoading(false)
                    // console.log(res)
                })
                .catch(err=> {
                    setLoading(false)
                    console.log(err)
                })
        }

    }, [posts.length, currentUser.token] );
    return (
        <Spin spinning={loading} className={'postIndex'}>
            <List
                itemLayout="horizontal"
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        <PostRead token={currentUser.token} post={item}/>
                    </List.Item>
                )}
            />
        </Spin>
    )
}
const mapStateToProps =({user:{currentUser}})=>({currentUser})
export default connect(mapStateToProps)  (PostIndex)
