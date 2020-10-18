import React,{useState,useEffect} from 'react'
import Axios from "axios";
import PostRead from "./read/read";
import apiUrls, {axiosHeader} from "../environment";
import {connect} from "react-redux";
import {Spin} from "antd";
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
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!posts){
            setLoading(true)
            Axios
                .get(apiUrls.post.index,{
                    headers:{
                        ...axiosHeader,
                        Authorization:'Bearer '+ currentUser.access_token
                    }
                })
                .then(res=> {
                    setPosts(res.data)
                    setLoading(false)
                })
                .catch(err=> {
                    setLoading(false)
                    // console.log(err)
                })
        }
    }, );
    // console.log('Posts from post index',posts)

    return (
        <Spin spinning={loading} className={'postIndex'}>
            {posts && posts.map(post=><PostRead key={post.id} post ={post}/>
            )}
        </Spin>
    )
}
const mapStateToProps =({user:{currentUser}})=>({currentUser})
export default connect(mapStateToProps)  (PostIndex)
